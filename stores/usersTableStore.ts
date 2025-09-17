import { create } from "zustand";

export type tableContent = {
  username: string;
  email: string;
  googleId: string;
  roles: ("admin" | "user" | "manager")[];
};

interface UsersTableStore {
  table_data: tableContent[];
  addRole: (role: "user" | "manager" | "admin", googleId: string) => void;
  deleteRole: (role: "user" | "manager" | "admin", googleId: string) => void;
  deleteUser: (googleId: string) => void;
  setTableData: (table_data: tableContent[]) => void;
}

export const useUsersTableStore = create<UsersTableStore>((set, get) => ({
  table_data: [],
  addRole(role, googleId) {
    const index = get().table_data.findIndex((a) => a.googleId == googleId);
    if (index < 0) return;

    if (get().table_data[index].roles.includes(role)) return;

    const table_data = get().table_data;
    table_data[index].roles.push(role);

    return set((val) => ({ ...val, table_data }));
  },
  deleteRole(role, googleId) {
    const index = get().table_data.findIndex((a) => a.googleId == googleId);
    if (index < 0) return;

    if (!get().table_data[index].roles.includes(role)) return;

    const table_data = [...get().table_data];
    table_data[index] = {
      ...table_data[index],
      roles: table_data[index].roles.filter((r) => r !== role),
    };

    return set((val) => ({ ...val, table_data }));
  },
  deleteUser(googleId) {
    const index = get().table_data.findIndex((a) => a.googleId == googleId);
    if (index < 0) return;

    let table_data = [...get().table_data];
    table_data = table_data.filter((a) => a.googleId != googleId);

    return set((val) => ({ ...val, table_data }));
  },
  setTableData(table_data) {
    return set((val) => ({ ...val, table_data }));
  },
}));
