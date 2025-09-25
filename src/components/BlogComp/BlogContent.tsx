import Link from "next/link";
import { ReactNode } from "react";

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
        <img
          src={data.data}
          alt="Image"
          width={600}
          height={500}
          className="w-full h-auto rounded-xl"
        />
      );
    }
    case "file": {
      return (
        <Link href={data.data} download={true}>
          Dowload file
        </Link>
      );
    }
    default:
      return <p>Битий блок</p>;
  }
}

function BlogContent({
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
    <section className="flex flex-col gap-[20px]">
      {content.map((el) =>
        Wrapper({ children: getBlogComponent(el), id: el.id })
      )}
    </section>
  ) : (
    <section className="flex flex-col gap-[20px]">
      {content.map((el) => getBlogComponent(el))}
    </section>
  );
}

export default BlogContent;
