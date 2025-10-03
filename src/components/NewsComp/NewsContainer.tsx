"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { blogTableContent } from "../../../stores/blogsTableStore";
import NewsCard1 from "./NewsCard1";
import NewsCard2 from "./NewsCard2";
import NewsCard3 from "./NewsCard3";
import NewsCardMobile from "./NewsCardMobile";

function NewsConatiner({ blogs }: { blogs: blogTableContent[] }) {
  const mobile = useIsMobile();
  return mobile ? (
    <article className="flex flex-col h-max w-full gap-[20px] mt-10">
      <NewsCardMobile {...blogs[0]} />
      <NewsCardMobile {...blogs[1]} />
      <NewsCardMobile {...blogs[2]} />
    </article>
  ) : (
    <article className="flex flex-row flex-wrap h-max">
      <div className="w-1/2 h-max p-2 flex flex-col gap-4">
        <NewsCard2 {...blogs[0]} />
        <NewsCard1 {...blogs[1]} />
      </div>
      <div className="w-1/2 h-max p-2 flex flex-col gap-4">
        <NewsCard1 {...blogs[2]} />
        <NewsCard2 {...blogs[3]} />
      </div>
      <div className="w-full h-60 p-2 flex flex-row gap-4">
        <NewsCard3 {...blogs[4]} />
        <NewsCard3 {...blogs[5]} />
        <NewsCard3 {...blogs[6]} />
        <NewsCard3 {...blogs[7]} />
      </div>
    </article>
  );
}

export default NewsConatiner;
