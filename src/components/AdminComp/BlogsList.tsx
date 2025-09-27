"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  blogTableContent,
  useBlogsTable,
} from "../../../stores/blogsTableStore";
import BlogsTable from "./BlogsTable";
import { useRequester } from "@/hooks/useRequester";
import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useUserStore } from "../../../stores/userStore";
import { Button } from "../ui/button";
import { EyeIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

const columns: ColumnDef<blogTableContent>[] = [
  {
    accessorKey: "title",
    header: "Заголовок",
    cell(props) {
      return (
        <p className="w-full max-w-60  truncate">
          {props.getValue() as string}
        </p>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Опис",
    cell(props) {
      return (
        <p className="w-full max-w-60  truncate">
          {props.getValue() as string}
        </p>
      );
    },
  },
  {
    accessorKey: "avatar",
    header: "Аватарка блогу",
    cell({ getValue }) {
      return (
        <Dialog>
          <DialogTrigger>
            <Button>
              <EyeIcon /> Переглянути аватар
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Аватар цього блогу</DialogTitle>
            </DialogHeader>
            <img
              src={getValue() as string}
              alt="icon"
              width={600}
              height={500}
              className="rounded-lg"
            ></img>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "comments",
    header: "Кількість коментів",
    cell(props) {
      const val = props.getValue() as [];
      return <p className="w-full text-start">{val.length}</p>;
    },
  },
  {
    accessorKey: "author",
    header: "Автор",
    cell: function Cell(props) {
      const userStore = useUserStore();

      const val = props.getValue() as { username: string; googleId: string };
      return (
        <p className="w-full text-start">
          {val.username}
          {val.googleId == userStore.googleId ? " (Ви)" : null}
        </p>
      );
    },
  },
  {
    id: "action",
    cell: function Cell({ row }) {
      const requester = useRequester();
      const userStore = useUserStore();
      const blogsTableStore = useBlogsTable();

      const rowUserId = row.getValue("author") as { googleId: string };

      const blogId = blogsTableStore.tableContent.find(
        (a) => a.title == (row.getValue("title") as string)
      )?._id;

      function deleteBlog() {
        if (!requester.getRequester().isAuth) return;
        if (userStore.roles?.includes("admin")) {
          requester
            .getRequester()
            .instance.delete(`/blog/delete/admin/${blogId}`)
            .then(() => {
              blogsTableStore.delete(blogId || "");
            })
            .catch(() => {
              alert("Error!");
            })
            .finally(() => {
              requester.endRequest();
            });
        } else {
          requester
            .getRequester()
            .instance.delete(`/blog/delete/manager/${blogId}`)
            .then(() => {
              blogsTableStore.delete(blogId || "");
            })
            .catch(() => {
              alert("Error!");
            })
            .finally(() => {
              requester.endRequest();
            });
        }
      }
      return (
        <div className="flex flex-row gap-[20px]">
          <Dialog>
            <DialogTrigger
              disabled={
                rowUserId.googleId != userStore.googleId &&
                !userStore.roles?.includes("admin")
              }
            >
              <Button
                disabled={
                  rowUserId.googleId != userStore.googleId &&
                  !userStore.roles?.includes("admin")
                }
                variant={"destructive"}
              >
                <TrashIcon />
                Видалити
              </Button>
            </DialogTrigger>
            <DialogContent>
              <p>Ви впеанені, що дійсно хочете видалити цей блог?</p>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"outline"}>Скасувати</Button>
                </DialogClose>
                <DialogClose>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      deleteBlog();
                    }}
                  >
                    Видалити
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link href={"/blog/" + blogId}>
            <Button>
              <EyeIcon />
              Подивитись
            </Button>
          </Link>
        </div>
      );
    },
  },
];

function BlogsList() {
  const requester = useRequester();
  const store = useBlogsTable();
  const [_res, fetchFun] = useApi(async () => {
    if (!requester.getRequester().isAuth) return;
    requester
      .getRequester()
      .instance.get("/blog/")
      .then((data: unknown) => {
        const data_ = data as { _doc: blogTableContent }[];
        store.setTableContent(
          data_.map((el: { _doc: blogTableContent }) => ({
            ...el._doc,
          })) as blogTableContent[]
        );
      })
      .finally(() => {
        requester.endRequest();
      });
  });

  useEffect(() => {
    fetchFun();
  }, [requester.getRequester().isAuth]);
  return (
    <BlogsTable columns={columns} data={store.tableContent || []}></BlogsTable>
  );
}

export default BlogsList;
