import { Card, CardContent } from "../ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";

function NewsCard3({
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
    <Link href={`/blog/${_id == "none" ? "" : _id}`} className="w-1/4 h-50">
      <Card className="w-full h-full hover:scale-98 transition">
        <CardContent className="flex flex-row gap-[10px]">
          <img className="w-1/2 h-40 rounded-lg" src={avatar} alt="image"></img>
          <div className="flex flex-col w-1/2 h-full gap-[20px]">
            <h4 className="text-[0.9rem] font-bold w-full h-5 text-start text-wrap truncate">
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

export default NewsCard3;
