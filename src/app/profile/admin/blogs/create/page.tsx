"use client";
import BlogContentClient from "@/components/BlogComp/BlogContentClient";
import FileSelector from "@/components/ResourcesSelectors/FileSelector";
import ImageSelector from "@/components/ResourcesSelectors/ImageSelector";
import TextSelector from "@/components/ResourcesSelectors/TextSelector";
import { Button } from "@/components/ui/button";

import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  FileJsonIcon,
  ImageIcon,
  TextIcon,
  TextInitialIcon,
} from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import * as uuid from "uuid";
import z, { ZodError } from "zod";
import { useBlogsStore } from "../../../../../../stores/blogsStore";
import { useRouter } from "next/navigation";

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

interface ContentI {
  type: "image" | "file" | "paragraph" | "title";
  data: string;
  id: string;
}

function Page() {
  const blogsStore = useBlogsStore();
  const [image, setImage] = useState("68f616d9077112ec628dd9e6");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState<ContentI[]>([]);

  const [errors, setErrors] = useState<{
    title: null | string;
    description: null | string;
  }>({ title: null, description: null });

  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const errors_: {
      title: null | string;
      description: null | string;
    } = { title: null, description: null };
    const titleSchema = z
      .string()
      .min(3, "Заголовок має містити щонайменше 3 символи")
      .max(150, "Заголовок занадто довгий");
    const descriptionSchema = z
      .string()
      .min(3, "Опис має містити щонайменше 3 символи")
      .max(340, "Опис занадто довгий");

    let valid = true;

    if (content.length < 1) valid = false;
    try {
      titleSchema.parse(title);
    } catch (err) {
      errors_.title = (err as ZodError<string>).issues[0].message;
      valid = false;
    }
    try {
      descriptionSchema.parse(description);
    } catch (err) {
      errors_.description = (err as ZodError<string>).issues[0].message;
      valid = false;
    }

    setErrors(errors_);
    setIsFormValid(valid);
  }, [title, description, content]);

  return (
    <section className="flex flex-col gap-[20px] w-[90%] h-full overflow-y-scroll items-center justify-center pt-10 pb-10">
      {/* <Card className="w-full">
        <CardHeader>
          <CardTitle>Create form</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogCreateForm />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogCreateContent />
        </CardContent>
      </Card>
      <BlogCreateButton /> */}

      <ImageSelector
        callbackSuccess={(newResourceImage) => {
          setImage(newResourceImage);
        }}
        callbackFailed={() => {}}
      >
        <DialogTrigger className="w-full">
          <div className="relative w-full h-300 overflow-hidden rounded-xl">
            <div
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${image})`,
              }}
              className="absolute inset-0 bg-cover bg-center filter blur-md scale-110 brightness-50"
            />

            <div className="relative z-10 flex items-center justify-center h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${image}`}
                alt="main image"
                width={1200}
                height={1200}
                className="h-full w-auto"
              ></Image>
            </div>
          </div>
        </DialogTrigger>
      </ImageSelector>
      <textarea
        className="bg-none border-none w-[99%] h-auto h-[8rem] text-[4rem] resize-none font-bold"
        placeholder="Це заголовок вашого блогу"
        value={title}
        onChange={(ev) => {
          setTitle(ev.target.value);
        }}
      ></textarea>
      {errors.title ? (
        <p className="text-red-500 w-full border-red-500 border-[1px] p-3 rounded-lg">
          {errors.title}
        </p>
      ) : null}
      <textarea
        className="bg-none border-none w-[99%] h-auto h-[4rem] text-[2rem] resize-none"
        placeholder="Це опис вашого блогу"
        maxLength={340}
        minLength={3}
        value={description}
        onChange={(ev) => {
          setDescription(ev.target.value);
        }}
      ></textarea>
      {errors.description ? (
        <p className="text-red-500 w-full border-red-500 border-[1px] p-3 rounded-lg">
          {errors.description}
        </p>
      ) : null}

      <BlogContentClient
        content={content}
        Wrapper={applyWrapper((id: string) => {
          setContent(content.filter((a) => a.id != id));
        })}
      ></BlogContentClient>
      <div className="grid grid-cols-4 auto-rows-fr gap-2 w-full h-15">
        <ImageSelector
          callbackFailed={() => {}}
          callbackSuccess={(val) => {
            const content_ = [...content];
            content_.push({ type: "image", id: uuid.v4(), data: val });
            setContent(content_);
          }}
        >
          <DialogTrigger className="w-[1fr] h-[1fr]">
            <Button className="w-full h-full">
              <ImageIcon /> Картинка
            </Button>
          </DialogTrigger>
        </ImageSelector>
        <TextSelector
          callbackSuccess={(data: string) => {
            const content_ = [...content];
            content_.push({ type: "paragraph", id: uuid.v4(), data });
            setContent(content_);
          }}
          callbackFailed={() => {}}
        >
          <DialogTrigger className="w-[1fr] h-[1fr]">
            <Button className="w-full h-full">
              <TextIcon /> Параграф
            </Button>
          </DialogTrigger>
        </TextSelector>
        <TextSelector
          callbackSuccess={(data: string) => {
            const content_ = [...content];
            content_.push({ type: "title", id: uuid.v4(), data });
            setContent(content_);
          }}
          callbackFailed={() => {}}
        >
          <DialogTrigger className="w-[1fr] h-[1fr]">
            <Button className="w-full h-full">
              <TextInitialIcon /> Заголовок
            </Button>
          </DialogTrigger>
        </TextSelector>

        <FileSelector
          callbackSuccess={(val) => {
            const content_ = [...content];
            content_.push({ type: "file", id: uuid.v4(), data: val });
            setContent(content_);
          }}
          callbackFailed={() => {}}
        >
          <DialogTrigger className="w-[1fr] h-[1fr]">
            <Button className="w-full h-full">
              <FileJsonIcon /> Файл
            </Button>
          </DialogTrigger>
        </FileSelector>
      </div>
      <Button
        className="w-full h-15"
        disabled={!isFormValid}
        onClick={async () => {
          if (isFormValid) {
            if (
              await blogsStore.addNewBlog(title, description, content, image)
            ) {
              router.back();
            }
          }
        }}
      >
        Створити
      </Button>
    </section>
  );
}

export default Page;
