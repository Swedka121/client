import { Card, CardContent, CardFooter } from "../ui/card";
import { FileIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function FileResource({
  real_name,
  click,
  author,
}: {
  real_name: string;
  author: { username: string; avatar: string };
  click: () => void;
}) {
  return (
    <Card onClick={click}>
      <CardContent className="flex flex-row justify-between items-center">
        <FileIcon />
        <p>{real_name}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center flex-row">
        <div className="flex flex-row items-center">
          <Avatar className="size-6">
            <AvatarImage src={author.avatar as string}></AvatarImage>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <p className="text-[0.8rem] mr-[20px] ml-[10px]">{author.username}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default FileResource;
