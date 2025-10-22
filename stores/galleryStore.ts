import { create } from "zustand";
import { ResourceImageI } from "./resourcesStore";
import { useUserStore } from "./userStore";
import { toast } from "sonner";

export interface GalleryI {
  name: string;
  images: ResourceImageI[];
}

interface GalleryStoreI {
  collections: Map<string, ResourceImageI[]>;
  load: () => Promise<void>;
  addNewCollection: (name: string) => Promise<void>;
  deleteCollection: (name: string) => Promise<void>;
  addImageToCollection: (name: string, resourceId: string) => Promise<void>;
  deleteImageFromCollection: (
    name: string,
    resourceId: string
  ) => Promise<void>;
}

export const useGalleryStore = create<GalleryStoreI>((set, get) => ({
  collections: new Map(),
  async load() {
    const client = await useUserStore.getState().getAuthorizedClient();
    const data: { name: string; images: ResourceImageI }[] = await client
      .get("/gallery/")
      .then((data) => data.data)
      .catch(() => {
        toast.error("Не вдалося завантажити дані про колекції у галереї!");
        return [];
      });

    const collections = new Map();

    data.forEach((element) => {
      collections.set(element.name, element.images);
    });

    set((va) => ({ ...va, collections }));
  },
  async addNewCollection(name) {
    const client = await useUserStore.getState().getAuthorizedClient();
    client
      .post("/gallery/", { name })
      .then((data) => {
        const collections = get().collections;
        collections.set(data.data.name, data.data.images);

        set((v) => ({ ...v, collections }));
      })
      .catch(() => {
        toast.error("Не вдалося створити нову колекцію у галереї!");
      });
  },
  async deleteCollection(name) {
    const client = await useUserStore.getState().getAuthorizedClient();
    client
      .delete(`/gallery/${name}`)
      .then(() => {
        const collections = get().collections;
        collections.delete(name);

        set((v) => ({ ...v, collections }));
      })
      .catch(() => {
        toast.error("Не вдалося видалити цю колекцію у галереї!");
      });
  },
  async addImageToCollection(name, resourceId) {
    const client = await useUserStore.getState().getAuthorizedClient();
    client
      .put(`/gallery/${name}`, { imageId: resourceId })
      .then((data) => {
        const collections = get().collections;
        collections.set(data.data.name, data.data.images);

        set((v) => ({ ...v, collections }));
      })
      .catch(() => {
        toast.error("Не вдалося додати зображення до колекції!");
      });
  },
  async deleteImageFromCollection(name, resourceId) {
    const client = await useUserStore.getState().getAuthorizedClient();
    client
      .delete(`/gallery/${name}/${resourceId}`)
      .then((data) => {
        const collections = get().collections;
        collections.set(data.data.name, data.data.images);

        set((v) => ({ ...v, collections }));
      })
      .catch(() => {
        toast.error("Не вдалося видалити зображення із колекції!");
      });
  },
}));
