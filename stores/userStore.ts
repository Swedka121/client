"use client";

import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { create } from "zustand";

interface jwtDecodeValue {
  user: {
    username: string;
    email: string;
    avatar: string;
    googleId: string;
    roles: ("user" | "manager" | "admin")[];
  };
  familyId: string;
  sub: string;
}

interface userStore {
  accessToken: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  googleId: string | null;
  roles: ("user" | "manager" | "admin")[] | null;
  setAccessToken: (token: string) => void;
  isAuthenticated: () => Promise<boolean>;
  getAccessToken: () => Promise<string>;
  getAuthorizedClient: () => Promise<Axios>;
  logout: () => Promise<void>;
}

export const useUserStore = create<userStore>((set, get) => ({
  accessToken: null,
  username: null,
  email: null,
  avatar: null,
  googleId: null,
  roles: null,
  setAccessToken: (token: string) => {
    const decode = jwtDecode(token) as jwtDecodeValue;

    set((val) => ({
      ...val,
      accessToken: token,
      username: decode.user.username,
      avatar:
        decode.user.avatar != "default"
          ? decode.user.avatar
          : Math.random() >= 0.5
          ? "/assets/avatar1.jpg"
          : "/assets/avatar2.jpg",
      email: decode.user.email,
      googleId: decode.user.googleId,
      roles: decode.user.roles,
    }));
  },
  isAuthenticated: async () => {
    if (get().accessToken === null) {
      console.log("access is null!");
      const res = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch(() => false);
      if (!res) return false;
      get().setAccessToken(res);
      return true;
    }
    return true;
  },
  logout: async () => {
    const client = await get().getAuthorizedClient();
    await client
      .get("/auth/logout")
      .then(() => {
        set(() => ({
          accessToken: null,
          avatar: null,
          email: null,
          googleId: null,
          roles: null,
          username: null,
        }));
      })
      .catch(() => {
        toast.error("Нам не вдалося вийти з вашого аккаунту!");
        return Promise.reject();
      });
  },
  async getAccessToken() {
    const isAuthenticated = await get().isAuthenticated();

    if (isAuthenticated) {
      return get().accessToken || "";
    }

    return "";
  },
  async getAuthorizedClient() {
    const accessToken = await get().getAccessToken();
    const axiosInterceptor = axios.create();

    if (accessToken == "") return axiosInterceptor;

    axiosInterceptor.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    axiosInterceptor.defaults.headers.common.Authorization =
      "Bearer " + accessToken;

    axiosInterceptor.interceptors.request.use((data) => {
      data.headers["Try"] = data.headers["Try"] || 0;
      data.headers["Authorization"] = "Bearer " + accessToken;
      return data;
    });

    axiosInterceptor.interceptors.response.use(
      (data) => {
        return data;
      },
      async (data: AxiosError) => {
        console.log(data);
        if (!data.config || !data.config.headers) Promise.reject("No config");

        console.log("COnfig true");

        switch (data.status) {
          case 401: {
            console.log("refresh!");
            if (Number.parseInt(data.config?.headers["Try"]) > 0)
              return Promise.reject(data);

            const res = await axios
              .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
                withCredentials: true,
              })
              .then((res) => res.data)
              .catch(() => false);

            if (!res) return Promise.reject("Can't refresh");

            useUserStore.getState().setAccessToken(res);

            const config = data.config as AxiosRequestConfig;
            if (config.headers) {
              config.headers.Authorization = "Bearer " + res;
              config.headers.Try =
                Number.parseInt(data.config?.headers["Try"]) + 1;
            }

            const res_ = await axios.request(config);
            return Promise.resolve(res_);
            break;
          }
          default:
            return Promise.reject(data);
        }
      }
    );

    return axiosInterceptor;
  },
}));
