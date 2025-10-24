import { create } from "zustand";
import { useUserStore } from "./userStore";
import { toast } from "sonner";

export type tableContent = {
  username: string;
  email: string;
  googleId: string;
  roles: ("admin" | "user" | "manager")[];
};

interface UsersTableStore {
  table_data: tableContent[];
  addRole: (
    role: "user" | "manager" | "admin",
    googleId: string
  ) => Promise<void>;
  deleteRole: (
    role: "user" | "manager" | "admin",
    googleId: string
  ) => Promise<void>;
  deleteUser: (googleId: string) => Promise<void>;
  setTableData: (table_data: tableContent[]) => void;
  load: () => Promise<void>;
}

export const useUsersTableStore = create<UsersTableStore>((set, get) => ({
  table_data: [],
  async load() {
    const client = await useUserStore.getState().getAuthorizedClient();

    const data: tableContent[] = await client
      .get("/user")
      .then((data) => data.data)
      .catch(() => {
        toast.error("Нам не вдалося завантажити дані про користувачів");
        return [];
      });

    set((v) => ({ ...v, table_data: data }));
  },
  async addRole(role, googleId) {
    const index = get().table_data.findIndex((a) => a.googleId == googleId);
    if (index < 0) return;

    if (get().table_data[index].roles.includes(role)) return;

    const client = await useUserStore.getState().getAuthorizedClient();
    await client
      .put(`/user/role?googleId=${googleId}&role=${role}`)
      .then(() => {
        const table_data = get().table_data;
        table_data[index].roles.push(role);
        set((val) => ({ ...val, table_data }));
      })
      .catch(() => {
        toast.error("Нам не вдалося додати роль цьому користувачеві");
      });
  },
  async deleteRole(role, googleId) {
    const index = get().table_data.findIndex((a) => a.googleId == googleId);
    if (index < 0) return;

    if (!get().table_data[index].roles.includes(role)) return;

    const client = await useUserStore.getState().getAuthorizedClient();
    await client
      .delete(`/user/role?googleId=${googleId}&role=${role}`)
      .then(() => {
        const table_data = [...get().table_data];
        table_data[index] = {
          ...table_data[index],
          roles: table_data[index].roles.filter((r) => r !== role),
        };
        set((val) => ({ ...val, table_data }));
      })
      .catch(() => {
        toast.error("Нам не вдалося додати роль цьому користувачеві");
      });
  },
  async deleteUser(googleId) {
    const index = get().table_data.findIndex((a) => a.googleId == googleId);
    if (index < 0) return;

    const client = await useUserStore.getState().getAuthorizedClient();
    await client
      .delete(`/user?googleId=${googleId}`)
      .then(() => {
        let table_data = [...get().table_data];
        table_data = table_data.filter((a) => a.googleId != googleId);
        set((val) => ({ ...val, table_data }));
      })
      .catch(() => {
        toast.error("Нам не вдалося видалити цього користувача");
      });
  },
  setTableData(table_data) {
    return set((val) => ({ ...val, table_data }));
  },
}));
