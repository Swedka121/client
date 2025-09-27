import { create } from "zustand";
import { z } from "zod";

export type blogTableContent = {
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
  };
  _id: string;
};

export type blogCreateType = {
  title: string;
  description: string;
  avatar: string;
  content: {
    type: "title" | "paragraph" | "image" | "video" | "file";
    data: string;
  }[];
};

interface blogsTable {
  tableContent: blogTableContent[];
  blogCreationState: {
    validated: boolean;
    data: blogCreateType;
  };
  validateBlogCreationData: () => void;
  setCreateTitle: (data: string) => void;
  setCreateDesc: (data: string) => void;
  setCreateAvatar: (data: string) => void;
  setCreateContent: (
    data: {
      type: "title" | "paragraph" | "image" | "video" | "file";
      data: string;
    }[]
  ) => void;
  setTableContent: (content: blogTableContent[]) => void;
  delete: (blogId: string) => void;
  update: (blogId: string, content: blogTableContent) => void;
  create: (content: blogTableContent) => void;
}

export const useBlogsTable = create<blogsTable>((set, get) => ({
  tableContent: [],
  blogCreationState: {
    validated: false,
    data: { title: "", description: "", avatar: "", content: [] },
  },
  validateBlogCreationData() {
    const zodSchema = z.object({
      title: z.string().min(3).max(150),
      description: z.string().min(3).max(1500),
      avatar: z.url(),
      content: z
        .array(
          z.object({
            type: z.string(),
            data: z.string(),
          })
        )
        .min(1)
        .max(100),
    });

    const data = get().blogCreationState.data;

    (async () => {
      console.log(data);
      await zodSchema
        .parseAsync(data)
        .then(() => {
          set((v) => ({
            ...v,
            blogCreationState: { ...v.blogCreationState, validated: true },
          }));
        })
        .catch((err) => {
          console.log(err);
          set((v) => ({
            ...v,
            blogCreationState: { ...v.blogCreationState, validated: false },
          }));
        });
    })();
  },
  setCreateTitle(data) {
    set((v) => ({
      ...v,
      blogCreationState: {
        ...v.blogCreationState,
        data: { ...v.blogCreationState.data, title: data },
      },
    }));
  },
  setCreateDesc(data) {
    set((v) => ({
      ...v,
      blogCreationState: {
        ...v.blogCreationState,
        data: { ...v.blogCreationState.data, description: data },
      },
    }));
  },
  setCreateAvatar(data) {
    set((v) => ({
      ...v,
      blogCreationState: {
        ...v.blogCreationState,
        data: { ...v.blogCreationState.data, avatar: data },
      },
    }));
  },
  setCreateContent(data) {
    set((v) => ({
      ...v,
      blogCreationState: {
        ...v.blogCreationState,
        data: { ...v.blogCreationState.data, content: data },
      },
    }));
  },
  setTableContent(content: blogTableContent[]) {
    set((v) => ({ ...v, tableContent: content }));
  },
  delete(blogId) {
    set((v) => ({
      ...v,
      tableContent: v.tableContent.filter((a) => a._id != blogId),
    }));
  },
  create(content) {
    set((v) => ({ ...v, tableContent: [...v.tableContent, content] }));
  },
  update(blogId, content) {
    set((v) => ({
      ...v,
      tableContent: [...v.tableContent.filter((a) => a._id != blogId), content],
    }));
  },
}));
