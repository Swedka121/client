"use client";
import { useEffect } from "react";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUserStore } from "../../../stores/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";

function LoginButton() {
  const userStore = useUserStore();
  const isAuthicated = useIsAuthenticated();

  useEffect(() => {
    console.log(isAuthicated, "Log2");
  }, [isAuthicated]);

  return !isAuthicated ? (
    <Link
      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/start`}
      className="justify-self-end ml-auto"
    >
      <Button>Login with google</Button>
    </Link>
  ) : (
    <Link className="ml-auto" href={"/profile"}>
      <div className="flex flex-row items-center justify-center gap-[20px] ml-auto h-15">
        <Avatar className="size-12">
          <AvatarImage src={userStore?.avatar ?? "/default-avatar.png"} />{" "}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <p className="text-[1rem] font-[Montserrat] text-black font-medium h-max">
          {userStore?.username ?? "User"}
        </p>
      </div>
    </Link>
  );
}

export default LoginButton;
