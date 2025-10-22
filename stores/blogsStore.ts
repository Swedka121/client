import { create } from "zustand";
import { useUserStore } from "./userStore";
import { toast } from "sonner";

export interface BlogI {
  title: string;
  description: string;
  avatar: string;
  content:
    | {
        type: "title" | "paragraph" | "image" | "video" | "file";
        data: string;
      }[]
    | null;
  comments: number;
  author: {
    username: string;
    avatar: string;
    googleId: string;
  };
  _id: string;
}

interface BlogsStoreI {
  blogs: Map<string, BlogI>;
  load: () => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  canDelete: (id: string) => boolean;
  addNewBlog: (
    title: string,
    description: string,
    content: {
      type: "title" | "paragraph" | "image" | "video" | "file";
      data: string;
    }[],
    avatar: string
  ) => Promise<boolean>;
}

export const useBlogsStore = create<BlogsStoreI>((set, get) => ({
  blogs: new Map(),
  async load() {
    const client = await useUserStore.getState().getAuthorizedClient();
    const data: BlogI[] = await client
      .get("/blog")
      .then((data) => data.data)
      .catch(() => {
        toast.error("Не вдалося завантажити дані про блоги!");
        return [];
      });

    console.log(data);

    const map: Map<string, BlogI> = new Map();
    data.forEach((el) => {
      map.set(el._id, el);
    });

    set((v) => ({ ...v, blogs: map }));
  },
  async deleteBlog(id) {
    const client = await useUserStore.getState().getAuthorizedClient();
    const isAdmin = useUserStore.getState().roles?.includes("admin");
    client
      .delete(`/blog/delete/${isAdmin ? "admin" : "manager"}/${id}`)
      .then(() => {
        const map = get().blogs;
        map.delete(id);

        set((v) => ({ ...v, blogs: map }));
      })
      .catch(() => {
        toast.error("Не вдалося видалити цей блог!");
      });
  },
  canDelete(id) {
    const map = get().blogs;
    const user = useUserStore.getState();

    const obj = map.get(id);

    return (
      user.roles?.includes("admin") || obj?.author.googleId == user.googleId
    );
  },

  async addNewBlog(title, description, content, avatar) {
    const client = await useUserStore.getState().getAuthorizedClient();
    return await client
      .post("/blog/create", { title, description, content, avatar })
      .then((data) => {
        const map = get().blogs;
        map.set(data.data._id, data.data);

        set((v) => ({ ...v, blogs: map }));
        return true;
      })
      .catch(() => {
        toast.error("Вибачте але нам не вдалося опублікувати цей блог");
        return false;
      });
  },
}));
