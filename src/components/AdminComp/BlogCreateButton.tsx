"use client";

import { useEffect, useTransition } from "react";
import {
  blogTableContent,
  useBlogsTable,
} from "../../../stores/blogsTableStore";
import { Button } from "../ui/button";
import { useRequester } from "@/hooks/useRequester";
import { useRouter } from "next/navigation";

function BlogCreateButton() {
  const router = useRouter();
  const requester = useRequester();
  const [isIn, transition] = useTransition();
  const store = useBlogsTable();

  useEffect(() => {
    const t = setInterval(() => {
      store.validateBlogCreationData();
    }, 500);

    return () => {
      clearInterval(t);
    };
  }, []);

  function createBlog() {
    if (requester.getRequester().isAuth)
      transition(() => {
        requester
          .getRequester()
          .instance.post("/blog/create", {
            ...store.blogCreationState.data,
          })
          .then((data: unknown) => {
            store.create(data as blogTableContent);
            console.log("Create!");
            router.back();
          })
          .catch(() => {})
          .finally(() => {
            requester.endRequest();
          });
      });
  }
  return (
    <Button
      className="w-full"
      disabled={!store.blogCreationState.validated}
      onClick={createBlog}
    >
      {isIn ? "Завантаження" : "Створити"}
    </Button>
  );
}

export default BlogCreateButton;
