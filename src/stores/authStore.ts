import { ApolloClient } from "@apollo/client";
import { create } from "zustand";

interface authStoreI {
  client: ApolloClient | null;
  trigger: () => void;
  setClient: (client: ApolloClient) => void;
}

export const useAuthStore = create<authStoreI>((set) => ({
  client: null,
  setClient(client) {
    set((prev) => ({ ...prev, client }));
  },
  trigger() {
    set((prev) => ({ ...prev, client: null }));
  },
}));
