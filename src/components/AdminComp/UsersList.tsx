"use client";
import { useEffect, useTransition } from "react";
import UsersTable from "./UsersTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Minus, Pencil, Plus, Trash } from "lucide-react";
import { useUserStore } from "../../../stores/userStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  tableContent,
  useUsersTableStore,
} from "../../../stores/usersTableStore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

const columns: ColumnDef<tableContent>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "googleId",
    header: "Google ID",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell({ getValue }) {
      return (
        <div className="flex flex-row gap-[10px]">
          {(getValue() as string[]).map((el) => (
            <Badge key={el} variant={"default"}>
              {el}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "edit_roles",
    cell: function Cell({ row }) {
      const userStore = useUserStore();
      const tableStore = useUsersTableStore();

      async function addAdmin() {
        await tableStore.addRole("admin", row.original.googleId);
      }
      async function removeAdmin() {
        await tableStore.deleteRole("admin", row.original.googleId);
      }
      async function addManager() {
        await tableStore.addRole("manager", row.original.googleId);
      }
      async function deleteManager() {
        await tableStore.deleteRole("manager", row.original.googleId);
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button disabled={!userStore.roles?.includes("admin")}>
              <Pencil />
              Edit Roles
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuItem
              disabled={row.original.roles.includes("admin")}
              onClick={addAdmin}
            >
              Add role <Plus />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={removeAdmin}
              disabled={
                !row.original.roles.includes("admin") ||
                (row.original.googleId == userStore.googleId &&
                  userStore.roles?.includes("admin"))
              }
            >
              Remove role <Minus />
            </DropdownMenuItem>
            <DropdownMenuLabel>Manager</DropdownMenuLabel>
            <DropdownMenuItem
              disabled={row.original.roles.includes("manager")}
              onClick={addManager}
            >
              Add role <Plus />
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!row.original.roles.includes("manager")}
              onClick={deleteManager}
            >
              Remove role <Minus />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "delete",
    cell: function Cell({ row }) {
      const userStore = useUserStore();
      const tableStore = useUsersTableStore();

      async function deleteUser() {
        await tableStore.deleteUser(row.original.googleId);
      }

      return (
        <Dialog>
          <DialogTrigger
            disabled={
              userStore.googleId == row.original.googleId ||
              !userStore.roles?.includes("admin")
            }
          >
            <Button
              variant={"destructive"}
              disabled={
                userStore.googleId == row.original.googleId ||
                !userStore.roles?.includes("admin")
              }
            >
              <Trash />
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent>
            <p>Are you sure to delete this user?</p>
            <DialogFooter>
              <DialogClose>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button variant={"destructive"} onClick={deleteUser}>
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

function UserList() {
  const usersTableStore = useUsersTableStore();
  const transition = useTransition();

  useEffect(() => {
    transition[1](() => {
      usersTableStore.load();
    });
  }, []);

  return !transition[0] ? (
    <div className="overflow-hidden w-full">
      <UsersTable<tableContent>
        columns={columns}
        data={usersTableStore.table_data || []}
      />
    </div>
  ) : (
    <Spinner />
  );
}

export default UserList;
