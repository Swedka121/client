"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { use, useEffect, useState } from "react";

function LoginQueryMessageError({
  searchParams,
}: {
  searchParams: Promise<{ sucess?: string; error?: string }>;
}) {
  const query = use(searchParams);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(typeof query.error !== "undefined");
  }, [query]);
  return show ? (
    <div className="w-full h-full flex flex-col items-center algin-center p-6">
      <Image
        src={"/assets/ill-3.jpg"}
        alt="Error illustration"
        width={700}
        height={700}
        className="h-3/4 w-auto"
      ></Image>
      <h3 className="font-[Montserrat] text-[1.5rem] w-3/4 text-center">
        Ой... Щось пішло не так коли ми оброблювали ваш запит
      </h3>
      <Link href={"/"} className="w-2/3 mt-10">
        <Button className="w-full ">Назад</Button>
      </Link>
    </div>
  ) : null;
}

export default LoginQueryMessageError;
