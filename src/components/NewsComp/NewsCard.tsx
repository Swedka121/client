import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function NewsCard(el: {
  _id: string;
  description: string;
  avatar: string;
  title: string;
  author: { username: string; avatar: string };
}) {
  return (
    <Link className="w-[1fr] h-75" href={`/blog/${el._id}`}>
      <Card key={el._id} className="w-full h-full">
        <CardHeader className="flex flex-row gap-4 relative">
          <div className="relative overflow-hidden rounded-lg w-1/2 h-60 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-md scale-110 brightness-50"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${el.avatar})`,
              }}
            ></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${el.avatar}`}
                width={800}
                height={800}
                alt="image"
                className="h-60 w-auto object-cover z-[1]"
              ></Image>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <CardTitle className="max-h-20">{el.title}</CardTitle>
            <CardDescription className="max-h-18 mt-2">
              {el.description}
            </CardDescription>
            <div className="flex flex-row items-center absolute bottom-0">
              <Avatar className="size-12">
                <AvatarImage src={el.author.avatar as string}></AvatarImage>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <p className="text-[1rem] mr-[20px] ml-[10px]">
                {el.author.username}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
export default NewsCard;
