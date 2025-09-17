import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useUserStore } from "../../stores/userStore";

export function useRequester() {
  const userStore = useUserStore();
  const [after_access, setAfterAccess] = useState("");
  const endRequest = useCallback(() => {
    if (after_access) userStore.setAccessToken(after_access);
  }, [after_access]);
  const getRequester = useCallback<
    () => {
      instance: AxiosInstance;
      isAuth: boolean;
    }
  >(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      withCredentials: true,
    });

    if (!userStore.accessToken) return { instance, isAuth: false };

    instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${userStore.accessToken}`;
      console.log(config.headers);
      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        console.log(response.data);
        return response.data;
      },
      async (error: AxiosError) => {
        if (!error.config) return Promise.reject("Error config is undefined");

        switch (error.status) {
          case 401: {
            try {
              const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`
              );
              setAfterAccess(res.data);

              error.config.headers["Authorization"] = `Bearer ${res.data}`;

              return Promise.resolve(await instance.request(error.config));
            } catch (err) {
              return Promise.reject(err);
            }
          }
          default:
            return Promise.reject(error);
        }
      }
    );

    return { instance, isAuth: true };
  }, [userStore.accessToken]);

  return { getRequester, endRequest };
}
