import { gql } from "@apollo/client";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useStorageStore } from "./storageStore";

interface profileStoreI {
  name: string;
  avatar: string;
  load: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
  updateAvatar: (avatar: File) => Promise<void>;
}

const GET_PROFILE = gql`
  query {
    profile {
      avatar
      name
    }
  }
`;

const CHANGE_USERNAME = gql`
  mutation ChangeUsername($username: String!) {
    change_username(username: { username: $username }) {
      name
    }
  }
`;

const CHANGE_AVATAR = gql`
  mutation ChangeAvatar($avatar: String!) {
    change_avatar(avatar: { avatar: $avatar }) {
      avatar
    }
  }
`;

export const useProfileStore = create<profileStoreI>((set, get) => ({
  name: "User",
  avatar: "default_avatar.png",
  load: async () => {
    if (!useAuthStore.getState().client) return;
    const result = await useAuthStore.getState().client.query<{
      profile: {
        name: string;
        avatar: string;
      };
    }>({ query: GET_PROFILE, fetchPolicy: "no-cache" });

    console.log(result.data);

    set((prev) => ({ ...prev, ...result.data.profile }));
  },
  updateName: async (name) => {
    if (!useAuthStore.getState().client) return;
    const result = await useAuthStore.getState().client.mutate<{
      change_username: {
        name: string;
      };
    }>({ variables: { username: name }, mutation: CHANGE_USERNAME });

    set((prev) => ({ ...prev, name: result.data.change_username.name }));
  },
  updateAvatar: async (avatar: File) => {
    if (!useAuthStore.getState().client) return;

    const filePath = useStorageStore.getState().loadFile(avatar);

    const result = await useAuthStore.getState().client.mutate<{
      change_avatar: {
        avatar: string;
      };
    }>({ variables: { avatar: filePath }, mutation: CHANGE_AVATAR });

    set((prev) => ({ ...prev, avatar: result.data.change_avatar.avatar }));
  },
}));
