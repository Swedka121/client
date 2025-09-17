"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
  logout: () => void;
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
  logout: () => {
    set(() => ({
      accessToken: null,
      avatar: null,
      email: null,
      googleId: null,
      roles: null,
      username: null,
    }));
  },
}));
