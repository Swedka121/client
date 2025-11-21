import { gql } from "@apollo/client";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useLoadingStore } from "./loadingStore";

interface FileI {
  mime: string;
  size: number;
}

interface StorageStoreI {
  files: Map<string, FileI>;
  tags: Set<string>;
  diskSpace: number;
  selectedTag: string;
  spaced: number;
  load: () => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  setTag: (tag: string) => void;
  getFiltredFiles: () => { path: string; size: number; mime: string }[];
  loadFile: (file: File) => Promise<string>;
}

const GET_STORE_QUERY = gql`
  query {
    get_storage {
      files {
        size
        path
      }
      spaced
      diskSize
    }
  }
`;

const DELETE_FILE = gql`
  mutation DeleteFile($filename: String!) {
    delete_file(filePath: $filename) {
      spaced
      diskSize
    }
  }
`;

const GET_LOAD_CODE = gql`
  query {
    get_load_code
  }
`;

export const useStorageStore = create<StorageStoreI>((set, get) => ({
  files: new Map<string, FileI>(),
  tags: new Set<string>(),
  selectedTag: "none",
  diskSpace: 1,
  spaced: 1,
  setTag: (tag) => {
    set((prev) => ({ ...prev, selectedTag: tag }));
  },
  load: async () => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.query<{
      get_storage: {
        spaced: number;
        diskSize: number;
        files: [{ size: number; path: string }];
      };
    }>({ query: GET_STORE_QUERY, fetchPolicy: "no-cache" });

    const map = new Map<string, FileI>();
    const set_ = new Set<string>();

    set_.add("none");

    result.data.get_storage.files.forEach((file) => {
      map.set(file.path, { mime: file.path.split(".")[1], size: file.size });
      set_.add(file.path.split(".")[1]);
    });

    set((prev) => ({
      ...prev,
      spaced: result.data.get_storage.spaced,
      diskSpace: result.data.get_storage.diskSize,
      files: map,
      tags: set_,
    }));
  },
  deleteFile: async (id) => {
    if (!useAuthStore.getState().client) return;

    const result = await useAuthStore.getState().client.mutate<{
      delete_file: { spaced: number; diskSize: number };
    }>({ mutation: DELETE_FILE, variables: { filename: id } });

    const map = get().files;
    const item = map.get(id);
    map.delete(id);

    const set_ = get().tags;

    if (
      map
        .values()
        .filter((a) => a.mime == item.mime)
        .toArray().length == 0
    ) {
      set_.delete(item.mime);
    }

    set((prev) => ({
      ...prev,
      files: map,
      tags: set_,
      spaced: result.data.delete_file.spaced,
      diskSpace: result.data.delete_file.diskSize,
    }));
  },
  getFiltredFiles: () => {
    const toReturn: { path: string; size: number; mime: string }[] = [];
    get().files.forEach((val, el) =>
      toReturn.push({ path: el, mime: val.mime, size: val.size })
    );

    if (get().selectedTag == "none") return toReturn;

    return toReturn.filter((a) => a.mime == get().selectedTag);
  },

  loadFile: async (file: File) => {
    useLoadingStore.getState().setLoading(true);

    const code = await useAuthStore.getState().client.query<{
      get_load_code: string;
    }>({ query: GET_LOAD_CODE, fetchPolicy: "no-cache" });

    const formDataFile = new FormData();
    formDataFile.append("file", file, file.name);

    console.log(code.data.get_load_code);

    const file_ = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/storage/upload/${code.data.get_load_code}`,
      {
        method: "POST",
        body: formDataFile,
      }
    ).then((data) => data.json());

    await get().load();

    useLoadingStore.getState().setLoading(false);

    return file_.path;
  },
}));
