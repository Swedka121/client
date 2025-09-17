"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

function LoginQueryMessageSuccess() {
  const query = useSearchParams();
  return query?.has("success") ? (
    <div className="w-full h-full flex flex-col items-center algin-center p-6">
      <Image
        src={"/assets/ill-2.jpg"}
        alt="Success illustration"
        width={700}
        height={700}
        className="h-3/4 w-auto"
      ></Image>
      <h3 className="font-[Montserrat] text-[1.5rem] w-3/4 text-center">
        Вітаємо, ви увійшли до системи!
      </h3>
      <Link href={"/profile"} className="w-2/3 mt-10">
        <Button className="w-full ">В профіль</Button>
      </Link>
      <Link href={"/"} className="w-2/3 mt-5">
        <Button className="w-full ">Назад</Button>
      </Link>
    </div>
  ) : null;
}

export default LoginQueryMessageSuccess;
