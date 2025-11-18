import { create } from "zustand";
import * as uuid from "uuid";

export interface toasterStoreI {
  toaster: {
    data: string;
    type: "info" | "error";
    id: string;
  }[];
  add: (data: string, type: "error" | "info") => void;
  remove: (id: string) => void;
}

export const useToasterStore = create<toasterStoreI>((set, get) => ({
  toaster: [],
  add: (data: string, type: "error" | "info") => {
    set((prev) => ({
      ...prev,
      toaster: [...prev.toaster, { data, type, id: uuid.v4() }],
    }));
  },
  remove: (id: string) => {
    set((prev) => ({
      ...prev,
      toaster: prev.toaster.filter((a) => a.id != id),
    }));
  },
}));
