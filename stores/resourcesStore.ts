import { create } from "zustand";
import { useUserStore } from "./userStore";
import { toast } from "sonner";

export interface ResourceImageI {
  _id: string;
  mimeType: `image/${string}`;
  path: string;
  real_name: string;
  author: {
    username: string;
    email: string;
    avatar: string;
    googleId: string;
    roles: ("user" | "manager" | "admin")[];
  };
}

export interface ResourceI {
  _id: string;
  mimeType: string;
  path: string;
  real_name: string;
  author: {
    username: string;
    email: string;
    avatar: string;
    googleId: string;
    roles: ("user" | "manager" | "admin")[];
  };
}

interface ResourcesStoreI {
  images: ResourceImageI[];
  others: ResourceI[];
  load: () => Promise<void>;
  addNewResourceByUrl: (url: string) => Promise<void>;
  deleteResource: (id: string) => Promise<void>;
  getFiltredImages: (id: string) => ResourceImageI[];
  getFiltredFiles: (id: string) => ResourceI[];
}

export const useResourcesStore = create<ResourcesStoreI>((set, get) => ({
  images: [],
  others: [],
  async load() {
    let data: ResourceI[] = await (
      await useUserStore.getState().getAuthorizedClient()
    )
      .get("/resources/")
      .then((data) => data.data)
      .catch((err) =>
        console.log("Error while loading resources data!: " + err)
      );

    if (data) {
      const images_: ResourceImageI[] = [];
      const others_: ResourceI[] = [];
      data = data.map((el) => {
        return {
          ...el,
          path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${el._id}`,
        };
      });
      data.forEach((el) => {
        if (el.mimeType.split("/")[0] == "image") {
          images_.push(el as ResourceImageI);
        } else {
          others_.push(el);
        }
      });

      set((val) => ({ ...val, images: images_, others: others_ }));
    }
  },
  async addNewResourceByUrl(url: string) {
    const client = await useUserStore.getState().getAuthorizedClient();
    const data: ResourceI = await client
      .post("/resources/load/url", { url })
      .then((data) => data.data)
      .catch((err) =>
        console.log("Error while loading resources data!: " + err)
      );

    if (data.mimeType.split("/")[0] == "image") {
      set((val) => ({
        ...val,
        images: [
          ...val.images,
          {
            ...(data as ResourceImageI),
            path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${data._id}`,
          },
        ],
      }));
    } else {
      set((val) => ({
        ...val,
        others: [
          ...val.others,
          {
            ...data,
            path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${data._id}`,
          },
        ],
      }));

      toast.success("Ресурс успішно доданий!");
    }
  },
  async deleteResource(id) {
    const client = await useUserStore.getState().getAuthorizedClient();
    client
      .delete(`/resources/${id}`)
      .then(() => {
        const images = get().images.filter((a) => a._id != id);
        const others = get().others.filter((a) => a._id != id);

        set((val) => ({ ...val, images, others }));

        toast.success("Ресурс успішно видалений!");
      })
      .catch(() => {
        toast.error("Нам не вдалося видалити ресурс");
      });
  },
  getFiltredImages(id: string) {
    return get().images.filter((a) => a._id.includes(id));
  },
  getFiltredFiles(id: string) {
    return get().others.filter((a) => a._id.includes(id));
  },
}));
