export const dynamic = "force-dynamic";
import Container from "@/components/ui/container";
import axios from "axios";
import { blogTableContent } from "../../../stores/blogsTableStore";
import NewsCard3 from "@/components/NewsComp/NewsCard3";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import NewsCardMobile from "@/components/NewsComp/NewsCardMobile";

export async function getBlogs() {
  const data = (
    await axios
      .get("/blog/", {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: { "Cache-Control": "no-cache" },
      })
      .catch(() => {
        return { data: [] };
      })
  ).data as { _doc: blogTableContent }[];
  console.log(data);
  return data.map((el) => ({ ...el._doc }));
}

async function Page() {
  const blogs = await getBlogs();
  const mobile =
    userAgent({ headers: await headers() }).device.type == "mobile";
  return (
    <Container>
      <section className="w-full h-auto flex flex-row flex-wrap gap-[20px] pt-40">
        {blogs.map((el) =>
          mobile ? (
            <NewsCardMobile {...el} key={el._id} />
          ) : (
            <NewsCard3 key={el._id} {...el} />
          )
        )}
      </section>
    </Container>
  );
}

export default Page;
