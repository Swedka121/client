"use client";
import {
  FileIcon,
  ImageIcon,
  Plus,
  TextIcon,
  TextInitialIcon,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardTitle } from "../ui/card";

import { z, ZodObject, ZodType } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { JSX, ReactNode, useEffect, useState } from "react";
import BlogContent from "../BlogComp/BlogContent";
import { useBlogsTable } from "../../../stores/blogsTableStore";
import * as uuid from "uuid";

const ELEMENTS_LIST = [
  {
    title: "Зображення",
    image: <ImageIcon />,
    system: "image",
    schema: z.object({ value: z.url() }),
  },
  {
    title: "Заголовок",
    image: <TextInitialIcon />,
    system: "title",
    schema: z.object({ value: z.string().min(3).max(300) }),
  },
  {
    title: "Параграф",
    image: <TextIcon />,
    system: "paragraph",
    schema: z.object({ value: z.string().min(3).max(1500) }),
  },
  {
    title: "Файл",
    image: <FileIcon />,
    system: "file",
    schema: z.object({ value: z.url() }),
  },
];

function applyWrapper(
  deleteFunc: (id: string) => void
): ({ children, id }: { children: ReactNode; id: string }) => ReactNode {
  return function Wrapper({
    children,
    id,
  }: {
    children: ReactNode;
    id: string;
  }) {
    return (
      <div
        className="w-full h-auto rounded-lg hover:bg-red-100 hover:p-1 transition-all"
        onClick={() => {
          deleteFunc(id);
        }}
      >
        {children}
      </div>
    );
  };
}

function BlogCreateContent() {
  const store = useBlogsTable();

  const [selected, setSelected] = useState<{
    title: string;
    system: string;
    image: JSX.Element | null;
    schema: ZodObject<{ value: ZodType }> | null;
  }>({
    title: "",
    system: "",
    image: null,
    schema: null,
  });
  const [noerror, setNoerror] = useState(false);
  const [dataVal, setDataVal] = useState<string | undefined>();
  const [content, setContent] = useState<
    {
      type: "image" | "title" | "file" | "video" | "paragraph";
      data: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    try {
      selected.schema?.parse({ value: dataVal });
      setNoerror(true);
    } catch {
      setNoerror(false);
    }
  }, [dataVal, selected]);

  // events functions

  function addContent() {
    setContent([
      ...content,
      {
        type: selected.system as
          | "image"
          | "title"
          | "file"
          | "video"
          | "paragraph",
        data: dataVal as string,
        id: uuid.v4(),
      },
    ]);
  }

  function deleteContent(id: string) {
    const filtred = content.filter((a) => a.id != id);
    setContent(filtred);
  }

  useEffect(() => {
    store.setCreateContent(
      content.map((el) => ({ type: el.type, data: el.data }))
    );
  }, [content]);
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <BlogContent
          content={content}
          Wrapper={applyWrapper((id: string) => {
            console.log(id);
            deleteContent(id);
          })}
        />
      </div>
      <Dialog>
        <DialogTrigger className="w-full mt-10">
          <Button className="w-full">
            <Plus></Plus>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Виберіть елемент який хочете створити</DialogTitle>
          </DialogHeader>
          <div className="w-full p-6 flex flex-col gap-[20px]">
            {ELEMENTS_LIST.map((el) => (
              <Card
                key={el.system}
                className={
                  selected.system == el.system ? "border-sky-500 border" : ""
                }
                onClick={() => {
                  setSelected(el);
                }}
              >
                <CardContent className="flex flex-row gap-[20px] items-center">
                  {el.image} <CardTitle>{el.title}</CardTitle>
                </CardContent>
              </Card>
            ))}
            <Input
              placeholder={"Введіть дані..."}
              value={dataVal}
              onChange={(ev) => {
                if (!selected) return;
                setDataVal(ev.target.value);
              }}
            />
            <DialogClose disabled={selected.system == "" || !noerror}>
              <Button
                disabled={selected.system == "" || !noerror}
                onClick={addContent}
              >
                Додати елемент
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default BlogCreateContent;
