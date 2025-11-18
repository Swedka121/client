import { useCallback } from "react";

declare global {
  interface Window {
    token: {
      get: () => Promise<string | null>;
      set: (token: string) => Promise<boolean>;
      getAccess: () => Promise<string | null>;
      setAccess: (token: string) => Promise<boolean>;
      logout: () => Promise<void>;
    };
  }
}

export function useRefreshToken() {
  const refreshToken = useCallback(async () => {
    return await window.token.get();
  }, []);

  const isAuthorized = useCallback(async () => {
    return (await window.token.get()) ? true : false;
  }, []);

  const setRefreshToken = useCallback(async (token: string) => {
    const isError = window.token.set(token);
    return isError;
  }, []);

  const logout = useCallback(async () => {
    await window.token.logout();
  }, []);

  return { refreshToken, setRefreshToken, isAuthorized, logout };
}

export function useAccessToken() {
  const accessToken = useCallback(async () => {
    return await window.token.getAccess();
  }, []);

  const setAccessToken = useCallback(async (token: string) => {
    const isError = window.token.setAccess(token);
    return isError;
  }, []);

  return { accessToken, setAccessToken };
}
