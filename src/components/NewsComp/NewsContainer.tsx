"use client";

import NewsCard1 from "./NewsCard1";
import NewsCard2 from "./NewsCard2";
import NewsCard3 from "./NewsCard3";

function NewsConatiner() {
  return (
    <article className="flex flex-row flex-wrap h-[80vh]">
      <div className="w-1/2 h-3/4 p-2 flex flex-col gap-4">
        <NewsCard2 />
        <NewsCard1 />
      </div>
      <div className="w-1/2 h-3/4 p-2 flex flex-col gap-4">
        <NewsCard1 />
        <NewsCard2 />
      </div>
      <div className="w-full h-1/4 p-2 flex flex-row gap-4">
        <NewsCard3 />
        <NewsCard3 />
        <NewsCard3 />
        <NewsCard3 />
      </div>
    </article>
  );
}

export default NewsConatiner;
