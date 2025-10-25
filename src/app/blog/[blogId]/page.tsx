import Container from "@/components/ui/container";
import axios from "axios";
import BlogContent from "@/components/BlogComp/BlogContent";
import * as uuid from "uuid";
import { Metadata } from "next";
import { BlogI } from "../../../../stores/blogsStore";
import Image from "next/image";
import { JSX } from "react";

async function getBlog(id: string) {
  const data = await axios
    .get(`/blog/${id}`, {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    })
    .then((data) => {
      return { ok: true, data: data.data };
    })
    .catch((err) => {
      return { ok: false, data: err };
    });

  return data as { ok: boolean; data: BlogI };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> {
  const blog = await getBlog((await params).blogId);

  if (!blog.ok)
    return {
      title: "Unedfined blog",
      description: "unedfined",
    };

  return {
    title: `Lyceum 23 | ${blog.data.title}`,
    description: blog.data.description,
    authors: [{ name: blog.data.author.username }],
    keywords: ["school_blogs", "Шкільні блоги"],
    openGraph: {
      type: "article",
      title: "Lyceum 23 | " + blog.data.title,
      description: blog.data.description,
      images: [{ url: blog.data.avatar }],
      siteName: "Lyceum 23",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.data.title,
      description: blog.data.description,
      images: [blog.data.avatar],
      creator: `@${blog.data.author.username}`, // optional
    },
  };
}

async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<JSX.Element> {
  const blog = await getBlog((await params).blogId as string);

  if (!blog.ok || !blog.data) {
    return (
      <Container>
        <section className="pt-50 w-full h-auto min-h-[100vh]">
          <h3 className="text-3xl font-bold">Blog not found</h3>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="pt-50 w-full h-auto">
        <div className="relative w-full h-300 overflow-hidden rounded-xl z-[-1]">
          <div
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${blog.data.avatar})`,
            }}
            className="absolute inset-0 bg-cover bg-center filter blur-md scale-110 brightness-50"
          />

          <div className="relative z-10 flex items-center justify-center h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${blog.data.avatar}`}
              alt="main image"
              width={1200}
              height={1200}
              className="h-full w-auto z-[-1] max-md:object-contain"
            ></Image>
          </div>
        </div>
        <h3 className="bg-none border-none w-[99%] h-auto h-[8rem] text-[4rem] resize-none font-bold">
          {blog.data.title}
        </h3>
        <p className="bg-none border-none w-[99%] h-auto h-[4rem] text-[2rem] resize-none">
          {blog.data.description}
        </p>
      </section>
      <section className="pt-20 pb-20">
        <BlogContent
          content={
            blog.data.content?.map((el) => ({ ...el, id: uuid.v4() })) || []
          }
        ></BlogContent>
      </section>
    </Container>
  );
}

export default Page;
