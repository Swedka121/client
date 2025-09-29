import { create } from "zustand";

interface UiStoreI {
  sidebar: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiStoreI>((set) => ({
  sidebar: false,
  toggleSidebar: () => {
    return set((v: { sidebar: boolean }) => ({ ...v, sidebar: !v.sidebar }));
  },
}));
