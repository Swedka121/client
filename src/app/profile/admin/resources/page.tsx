"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CopyIcon,
  DownloadIcon,
  FileIcon,
  FileJsonIcon,
  ImageIcon,
  LoaderIcon,
  Plus,
  TrashIcon,
} from "lucide-react";
import z from "zod";
import { useResourcesStore } from "../../../../../stores/resourcesStore";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AreYouSureToDeleteDialog from "@/components/ui/areYouSureToDeleteDialog";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ImageResource(el: {
  _id: string;
  path: string;
  author: { avatar: string; username: string };
}) {
  const resourceStore = useResourcesStore();
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="w-[1fr] h-60 rounded-lg overflow-hidden relative bg-gray-600 flex justify-center"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      key={el._id}
    >
      <Image
        src={el.path}
        className={
          "transition-all h-full w-auto " + (isHover ? "brightness-50" : null)
        }
        alt="image"
        width={800}
        height={800}
      ></Image>
      <div
        className={
          (isHover ? "mt-[55%] " : "mt-[80%] ") +
          "w-full absolute transition-all h-[30px] p-1 pr-3 pl-3 flex items-center flex-row justify-between text-white"
        }
      >
        <div className="flex flex-row items-center">
          <Avatar className="size-6">
            <AvatarImage src={el.author.avatar as string}></AvatarImage>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <p className="text-[0.8rem] mr-[20px] ml-[10px]">
            {el.author.username}
          </p>
        </div>

        <div className="flex flex-row gap-[10px]">
          <Button
            className="size-8"
            onClick={async () => {
              await navigator.clipboard.writeText(el._id);
              toast.info(
                "ID цього ресурсу успішно скопійовано в буфер обміну!"
              );
            }}
          >
            <CopyIcon />
          </Button>
          <AreYouSureToDeleteDialog
            callback={() => {
              resourceStore.deleteResource(el._id);
            }}
          >
            <DialogTrigger>
              <Button className="size-8">
                <TrashIcon />
              </Button>
            </DialogTrigger>
          </AreYouSureToDeleteDialog>
        </div>
      </div>
    </div>
  );
}

function FileResource({
  real_name,
  _id,
  path,
  author,
}: {
  real_name: string;
  _id: string;
  path: string;
  author: { avatar: string; username: string };
}) {
  const resourceStore = useResourcesStore();
  return (
    <Card>
      <CardContent className="flex flex-row justify-between items-center">
        <FileIcon />
        <p>{real_name}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center flex-row">
        <div className="flex flex-row items-center">
          <Avatar className="size-6">
            <AvatarImage src={author.avatar as string}></AvatarImage>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <p className="text-[0.8rem] mr-[20px] ml-[10px]">{author.username}</p>
        </div>
        <div className="flex flex-row gap-[10px]">
          <Link href={path} download={true} className="size-8">
            <Button className="size-8">
              <DownloadIcon />
            </Button>
          </Link>
          <Button
            className="size-8"
            onClick={async () => {
              await navigator.clipboard.writeText(_id);
              toast.info(
                "ID цього ресурсу успішно скопійовано в буфер обміну!"
              );
            }}
          >
            <CopyIcon />
          </Button>
          <AreYouSureToDeleteDialog
            callback={() => {
              resourceStore.deleteResource(_id);
            }}
          >
            <DialogTrigger>
              <Button className="size-8">
                <TrashIcon />
              </Button>
            </DialogTrigger>
          </AreYouSureToDeleteDialog>
        </div>
      </CardFooter>
    </Card>
  );
}

function Page() {
  const [isImages, setIsImages] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const resourcesStore = useResourcesStore();
  const transition = useTransition();
  useEffect(() => {
    transition[1](async () => {
      resourcesStore.load();
    });
  }, []);

  async function handleURLInserts(content: string) {
    console.log(content);
    const urlSchema = z.url();

    try {
      urlSchema.parse(content);

      await resourcesStore.addNewResourceByUrl(content);
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Вам потрібно ввести url!");
    }
  }
  return (
    <section className="w-full h-full p-8">
      <div className="flex flex-col gap-[10px]">
        <div className="flex w-full h-15">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => setDialogOpen(open)}
          >
            <DialogTrigger className="w-full h-full">
              <Button className="w-full h-full">
                Додати ресурс
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="h-20">
              <Input
                placeholder="Посилання на ресурс"
                onChange={async (ev) => {
                  await handleURLInserts(ev.target.value);
                }}
              ></Input>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 w-full h-15 gap-[20px]">
          <Button
            className="w-[1fr] h-full"
            onClick={() => {
              setIsImages(true);
            }}
            disabled={isImages}
          >
            Зображення <ImageIcon />
          </Button>
          <Button
            className="w-[1fr] h-full"
            onClick={() => setIsImages(false)}
            disabled={!isImages}
          >
            Інші файли <FileJsonIcon />
          </Button>
        </div>
      </div>

      {transition[0] ? (
        <div className="w-full h-40 flex justify-center algin-center">
          <LoaderIcon />
        </div>
      ) : (
        <div className="mt-10 w-full h-max grid grid-cols-6 auto-rows-fr gap-4">
          {isImages
            ? resourcesStore.images.map((el) => (
                <ImageResource key={el._id} {...el} />
              ))
            : resourcesStore.others.map((el) => (
                <FileResource key={el._id} {...el} />
              ))}
        </div>
      )}
    </section>
  );
}

export default Page;
