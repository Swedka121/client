import Container from "@/components/ui/container";
import axios from "axios";
import { blogTableContent } from "../../../stores/blogsTableStore";
import NewsCard3 from "@/components/NewsComp/NewsCard3";

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
  return (
    <Container>
      <section className="w-full h-auto flex flex-row flex-wrap gap-[20px] pt-40">
        {blogs.map((el) => (
          <NewsCard3 key={el._id} {...el} />
        ))}
      </section>
    </Container>
  );
}

export default Page;
