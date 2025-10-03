import { Card, CardContent } from "../ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";

function NewsCard1({
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
    <Link href={`/blog/${_id == "none" ? "" : _id}`} className="w-full h-2/3">
      <Card className="w-full h-130 hover:scale-98 transition">
        <CardContent className="flex flex-row gap-[20px]">
          <div className="w-1/2 h-120 rounded-lg overflow-hidden flex justify-center items-center">
            {" "}
            <img
              className="h-auto w-full min-h-full relative object-cover"
              src={avatar}
              alt="image"
            ></img>
          </div>
          <div className="flex flex-col w-1/2 h-full gap-[20px]">
            <h4 className="text-[1.2rem] font-bold w-full h-20 text-start truncate">
              {title}
            </h4>
            <p className="text-[1.0rem] w-full max-h-80 h-auto text-start text-wrap truncate">
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

export default NewsCard1;
