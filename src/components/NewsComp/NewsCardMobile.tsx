import { Card, CardContent } from "../ui/card";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";

function NewsCardMobile({
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
    <Link href={`/blog/${_id}`} className="w-full h-max">
      <Card className="w-full h-max">
        <CardContent className="flex flex-col gap-[20px] h-max">
          <div className="w-full h-85 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              className="h-auto w-full min-h-full relative object-cover"
              src={avatar}
              alt="image"
            ></img>
          </div>
          <div className="flex flex-col w-full h-max gap-[20px]">
            <h4 className="text-[1.2rem] font-bold w-full h-auto text-start">
              {title}
            </h4>
            <p className="text-[1.0rem] w-full h-auto text-start text-wrap truncate">
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

export default NewsCardMobile;
