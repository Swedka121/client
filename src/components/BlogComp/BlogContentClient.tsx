"use client";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { FileIcon } from "lucide-react";

function getBlogComponent(data: {
  type: "title" | "paragraph" | "image" | "video" | "file";
  data: string;
}) {
  switch (data.type) {
    case "title": {
      return <h3 className="text-[3rem] font-bold">{data.data}</h3>;
    }
    case "paragraph": {
      return (
        <p className="w-full background-gray-100 text-[1rem]">{data.data}</p>
      );
    }
    case "image": {
      return (
        <div className="relative w-full h-300 overflow-hidden rounded-xl">
          <div
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${data.data})`,
            }}
            className="absolute inset-0 bg-cover bg-center filter blur-md scale-110 brightness-50"
          />

          <div className="relative z-10 flex items-center justify-center h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${data.data}`}
              alt="main image"
              width={1200}
              height={1200}
              className="h-full w-auto"
            ></Image>
          </div>
        </div>
      );
    }
    case "file": {
      return (
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${data.data}`}
          download={true}
        >
          <Card className="w-200">
            <CardContent className="flex flex-row justify-between items-center">
              <FileIcon />
              <p>{data.data}</p>
            </CardContent>
          </Card>
        </Link>
      );
    }
    default:
      return <p>Битий блок</p>;
  }
}

function BlogContentClient({
  content,
  Wrapper,
}: {
  content: {
    type: "title" | "paragraph" | "image" | "video" | "file";
    data: string;
    id: string;
  }[];
  Wrapper?: ({
    children,
    id,
  }: {
    children: ReactNode;
    id: string;
  }) => ReactNode;
}) {
  return Wrapper != null ? (
    <section className="flex flex-col gap-[20px] w-full">
      {content.map((el) =>
        Wrapper({ children: getBlogComponent(el), id: el.id })
      )}
    </section>
  ) : (
    <section className="flex flex-col gap-[20px] w-full">
      {content.map((el) => getBlogComponent(el))}
    </section>
  );
}

export default BlogContentClient;
