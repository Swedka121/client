export const dynamic = "force-dynamic";
import Container from "@/components/ui/container";
import axios from "axios";
import { BlogI } from "../../../stores/blogsStore";
import NewsCard from "@/components/NewsComp/NewsCard";

async function getBlogs() {
  const data = (
    await axios
      .get("/blog/", {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: { "Cache-Control": "no-cache" },
      })
      .catch(() => {
        return { data: [] };
      })
  ).data as BlogI[];
  return data;
}

async function Page() {
  const blogs = (await getBlogs()) as BlogI[];

  return (
    <Container>
      <section className="w-full h-auto grid grid-cols-4 auto-rows-fr max-md:grid-cols-1 gap-4 pt-50 pb-50">
        {blogs.map((el) => (
          <NewsCard key={el._id} {...el} />
        ))}
      </section>
    </Container>
  );
}

export default Page;
