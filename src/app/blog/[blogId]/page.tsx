import Container from "@/components/ui/container";
import axios from "axios";
// import {} from "next/navigation"
import { blogTableContent } from "../../../../stores/blogsTableStore";
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlogContent from "@/components/BlogComp/BlogContent";
import * as uuid from "uuid";
import { Metadata } from "next";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import NewsCardMobile from "@/components/NewsComp/NewsCardMobile";

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

  return data as { ok: boolean; data: blogTableContent };
}

interface BlogPageProps {
  params: { blogId: string };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = await getBlog(params.blogId);

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

const Page: FC<BlogPageProps> = async ({ params }) => {
  const mobile =
    userAgent({ headers: await headers() }).device.type == "mobile";
  const blog = await getBlog(params["blogId"] as string);

  return (
    <Container>
      <section className="pt-40 w-full h-auto">
        {mobile ? (
          <NewsCardMobile {...blog.data} />
        ) : (
          <Card>
            <CardContent className="flex flex-row gap-[20px]">
              <img
                src={blog.data.avatar}
                className="rounded-lg w-1/2 h-full"
              ></img>
              <div className="flex flex-col gap-[20px]">
                <h4 className="text-[2rem] font-bold">{blog.data.title}</h4>
                <p>{blog.data.description}</p>
                <div className="flex flex-row items-center gap-[20px]">
                  <Avatar>
                    <AvatarImage src={blog.data.author.avatar}></AvatarImage>
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <p>{blog.data.author.username}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
};

export default Page;
