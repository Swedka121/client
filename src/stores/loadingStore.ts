import { create } from "zustand";

interface LoadingStoreI {
  isLoading: boolean;
  setLoading: (d: boolean) => void;
}

export const useLoadingStore = create<LoadingStoreI>((set) => ({
  isLoading: false,
  setLoading(d) {
    set((prev) => ({ ...prev, isLoading: d }));
  },
}));
