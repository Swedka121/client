"use client";

import { blogTableContent } from "../../../stores/blogsTableStore";
import NewsCard1 from "./NewsCard1";
import NewsCard2 from "./NewsCard2";
import NewsCard3 from "./NewsCard3";

function NewsConatiner({ blogs }: { blogs: blogTableContent[] }) {
  return (
    <article className="flex flex-row flex-wrap h-[80vh]">
      <div className="w-1/2 h-3/4 p-2 flex flex-col gap-4">
        <NewsCard2 {...blogs[0]} />
        <NewsCard1 {...blogs[1]} />
      </div>
      <div className="w-1/2 h-3/4 p-2 flex flex-col gap-4">
        <NewsCard1 {...blogs[2]} />
        <NewsCard2 {...blogs[3]} />
      </div>
      <div className="w-full h-1/4 p-2 flex flex-row gap-4">
        <NewsCard3 {...blogs[4]} />
        <NewsCard3 {...blogs[5]} />
        <NewsCard3 {...blogs[6]} />
        <NewsCard3 {...blogs[7]} />
      </div>
    </article>
  );
}

export default NewsConatiner;
