import { Card, CardContent } from "../ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";

function NewsCard2({
  title,
  description,
  author,
  avatar,
  _id,
}: {
  title: string;
  description: string;
  avatar: string;
  content:
    | {
        type: "title" | "paragraph" | "image" | "video" | "file";
        data: string;
      }[]
    | null;
  comments: number;
  author: {
    username: string;
    avatar: string;
  };
  _id: string;
}) {
  return (
    <Link href={`/blog/${_id == "none" ? "" : _id}`} className="w-full h-1/3">
      <Card className="w-full h-full hover:scale-98 transition">
        <CardContent className="flex flex-row gap-[20px]">
          <img
            className="w-auto h-55 rounded-lg"
            src={avatar}
            alt="image"
          ></img>
          <div className="flex flex-col w-1/2 h-full gap-[20px]">
            <h4 className="text-[1.2rem] font-bold w-full h-10 text-start">
              {title}
            </h4>
            <p className="text-[0.8rem] w-full h-10 text-start text-wrap truncate">
              {description}
            </p>
            <div className="flex flex-row items-center gap-[20px]">
              <Avatar>
                <AvatarImage src={author.avatar}></AvatarImage>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <p>{author.username}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default NewsCard2;
