import { ApolloLink, gql, Observable } from "@apollo/client";
import { CombinedGraphQLErrors } from "@apollo/client";
import { InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import Toaster from "@components/pageComp/Toaster";
import ToasterContainer, {
  toaster,
} from "@components/pageComp/ToasterContainer";
import { LanguageCode } from "@hooks/useLanguagePack";
import { AppLayout } from "@pages/AppLayout";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import MainPage from "@pages/MainPage";
import ProfilePage from "@pages/ProfilePage";
import RegistrationPage from "@pages/RegistrationPage";
import SettingsPage from "@pages/SettingsPage";
import StartPage from "@pages/StartPage";
import { createContext, useContext, useEffect, useState } from "react";
import { createHashRouter, RouterProvider, useNavigate } from "react-router";
import { useToasterStore } from "@stores/toasterStore";
import { useRefreshToken } from "@hooks/useRefreshToken";
import ApolloClientDynamic from "@components/ApolloClientDynamic";
import CreateCoursePage from "@pages/CreateCourse";
import CoursePage from "@pages/CoursePage";
import MaterialPage from "@pages/MaterialPage";
import CreateMaterialPage from "@pages/CreateMaterial";
import ConnectByCodePage from "@pages/ConnectByCodePage";

export const router = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <StartPage />,
      },
      { path: "login", element: <LoginPage /> },
      { path: "registartion", element: <RegistrationPage /> },
    ],
  },
  {
    path: "/app",
    errorElement: <ErrorPage />,
    element: <AppLayout />,
    children: [
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "course_create",
        element: <CreateCoursePage />,
      },
      {
        path: "course/:id",
        element: <CoursePage />,
      },
      {
        path: "material",
        element: <MaterialPage />,
      },
      {
        path: "create_material",
        element: <CreateMaterialPage />,
      },
      {
        path: "connect_code",
        element: <ConnectByCodePage />,
      },
    ],
  },
]);

export const modeDark = createContext({
  switch: () => {
    console.log("callback!");
  },
  dark: true,
});

export const languagePack = createContext<{
  set: (code: LanguageCode) => void;
  lang: LanguageCode;
}>({
  set: (code: LanguageCode) => {
    console.log("callback!");
  },
  lang: "ua",
});

function App() {
  // functional component starts here!

  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<LanguageCode>("en");

  useEffect(() => {
    setDark(JSON.parse(localStorage.getItem("dark")));
    setLang(JSON.parse(localStorage.getItem("lang")));
  }, []);
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("dark", JSON.stringify(true));
    } else {
      document.body.classList.add("light");
      localStorage.setItem("dark", JSON.stringify(false));
    }
    return () => {
      document.body.classList.remove("dark");
      document.body.classList.remove("dark");
    };
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
  }, [lang]);

  return (
    <ApolloClientDynamic>
      <ToasterContainer />
      <languagePack.Provider
        value={{
          lang,
          set(code) {
            setLang(code);
          },
        }}
      >
        <modeDark.Provider
          value={{
            switch: () => {
              setDark(!dark);
            },
            dark,
          }}
        >
          <RouterProvider router={router} />
        </modeDark.Provider>
      </languagePack.Provider>
    </ApolloClientDynamic>
  );
}

export default App;
