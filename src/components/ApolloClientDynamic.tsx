import { ApolloClient, ApolloLink, gql, Observable } from "@apollo/client";
import { CombinedGraphQLErrors } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import { useRefreshToken } from "@hooks/useRefreshToken";
import { useAuthStore } from "@stores/authStore";
import { useToasterStore } from "@stores/toasterStore";
import { FormattedExecutionResult } from "graphql";
import { ReactNode, useEffect, useState } from "react";
import { Subscriber } from "rxjs";

const REFRESH_MUTATION = gql`
  mutation Refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

const triesLink = new ApolloLink((operation, forward) => {
  const prevHeaders = operation.getContext().headers || {};
  const prevTry = Number(prevHeaders["tries"] || 0);

  const nextHeaders = {
    ...prevHeaders,
    tries: String(prevTry + 1),
  };

  operation.setContext({ headers: nextHeaders });

  return forward(operation);
});

const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    (async () => {
      try {
        const prevHeaders = operation.getContext().headers || {};
        const token = await window.token.getAccess();

        operation.setContext({
          headers: { ...prevHeaders, Authorization: `Bearer ${token}` },
        });

        const subscriber = forward(operation).subscribe({
          next: (v) => observer.next(v),
          error: (e) => observer.error(e),
          complete: () => observer.complete(),
        });

        return () => subscriber.unsubscribe();
      } catch (e) {
        observer.error(e);
      }
    })();
  });
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((el) => {
      console.log(el.extensions.code);
      useToasterStore.getState().add(el.message, "error");
    });
  }
});

const errorLinkAuth = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) return;

  for (const el of error.errors) {
    console.log(el.extensions.code);
    switch (el.extensions.code) {
      case "UNAUTHENTICATED": {
        const tries = Number(operation.getContext().headers?.tries || 1);

        if (tries < 2) {
          return new Observable((observer) => {
            (async () => {
              try {
                // try refresh

                const result = await client.mutate<{
                  refresh: { accessToken: string; refreshToken: string };
                }>({
                  mutation: REFRESH_MUTATION,
                  variables: { refreshToken: await window.token.get() },
                });

                if (result.error || !result.data?.refresh) {
                  await window.token.logout();
                  observer.error(result.error);
                  return;
                }

                // update tokens
                await window.token.set(result.data.refresh.refreshToken);
                await window.token.setAccess(result.data.refresh.accessToken);

                // set new headers and increment tries
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${result.data.refresh.accessToken}`,
                    tries: String(tries + 1),
                  },
                }));

                // re-run the original request
                const subscriber = forward(operation).subscribe({
                  next: (value) => observer.next(value),
                  error: (err) => observer.error(err),
                  complete: () => observer.complete(),
                });

                return () => subscriber.unsubscribe();
              } catch (e) {
                observer.error(e);
              }
            })();
          });
        }

        break;
      }

      default:
        useToasterStore.getState().add(el.message, "error");
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4565/graphql" }),
  ]),
});

const authClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    triesLink,
    authLink,
    errorLinkAuth,
    new HttpLink({ uri: "http://localhost:4565/graphql" }),
  ]),
});

function ApolloClientDynamic({ children }: { children: ReactNode }) {
  const { isAuthorized } = useRefreshToken();
  const authStore = useAuthStore();

  useEffect(() => {
    (async () => {
      if (!authStore.client) {
        const authorized = await isAuthorized();
        authStore.setClient(authorized ? authClient : client);
      }
    })();
  }, [authStore.client]);

  if (!authStore.client) return <div>Waiting for client...</div>;

  return <ApolloProvider client={authStore.client}>{children}</ApolloProvider>;
}

export default ApolloClientDynamic;
