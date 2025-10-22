"use client";
import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { EyeIcon, Plus, TrashIcon } from "lucide-react";
import { useBlogsStore } from "../../../../../stores/blogsStore";
import { useEffect, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AreYouSureToDeleteDialog from "@/components/ui/areYouSureToDeleteDialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";

function Page() {
  const blogsStore = useBlogsStore();
  const transition = useTransition();
  useEffect(() => {
    transition[1](() => {
      blogsStore.load();
    });
  }, []);
  return (
    <section className="w-full h-full p-8">
      <div className="w-full h-15">
        <Link href={"/profile/admin/blogs/create"} className="w-full h-full">
          <Button className="w-full h-full">
            Додати новий блог <Plus />
          </Button>
        </Link>
      </div>
      {transition[0] ? (
        <Spinner />
      ) : (
        <ItemGroup className="grid grid-cols-3 auto-rows-fr gap-4 mt-4">
          {Array.from(blogsStore.blogs.values()).map((el) => (
            <Card key={el._id}>
              <CardHeader className="flex flex-row gap-4 relative">
                <div className="overflow-hidden rounded-lg w-1/2 h-60 flex items-center justify-center bg-500-gray">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${el.avatar}`}
                    width={800}
                    height={800}
                    alt="image"
                    className="h-60 w-auto"
                  ></Image>
                </div>
                <div className="flex flex-col">
                  <CardTitle className="max-h-20">{el.title}</CardTitle>
                  <CardDescription className="max-h-20">
                    {el.description}
                  </CardDescription>
                  <div className="flex flex-row items-center absolute bottom-0">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={el.author.avatar as string}
                      ></AvatarImage>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <p className="text-[1rem] mr-[20px] ml-[10px]">
                      {el.author.username}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-row gap-2">
                {blogsStore.canDelete(el._id) ? (
                  <AreYouSureToDeleteDialog
                    callback={() => {
                      blogsStore.deleteBlog(el._id);
                    }}
                  >
                    <DialogTrigger>
                      <Button variant={"destructive"}>
                        <TrashIcon />
                        Видалити
                      </Button>
                    </DialogTrigger>
                  </AreYouSureToDeleteDialog>
                ) : (
                  <Button disabled={true} variant={"destructive"}>
                    <TrashIcon />
                    Видалити
                  </Button>
                )}

                <Link href={"/blog/" + el._id}>
                  <Button>
                    <EyeIcon />
                    Подивитись
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </ItemGroup>
      )}
    </section>
  );
}

export default Page;
