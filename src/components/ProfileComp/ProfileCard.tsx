"use client";
import Image from "next/image";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { useUserStore } from "../../../stores/userStore";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

function ProfileCard() {
  const userStore = useUserStore();
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? (
    <Card>
      <CardContent className="flex flex-row items-center">
        <Image
          width={600}
          height={600}
          className="w-1/2 h-auto rounded-full p-10"
          alt="avatar"
          src={userStore.avatar as string}
        ></Image>
        <div className="w-1/2 flex flex-col justify-start items-center h-full relative">
          <h3 className="w-full text-start text-[3rem] font-[Montserrat] font-bold p-4 pb-0">
            {userStore.username}
          </h3>
          <p className="w-full text-start text-[1rem] font-[Montserrat] font-light p-4 pt-0">
            {userStore.email}
          </p>
          <p className="w-full text-start text-[1rem] font-[Montserrat] font-light p-4">
            Roles:{" "}
            {userStore.roles
              ? userStore.roles.map((el) => (
                  <Badge key={el} variant={"secondary"}>
                    {el}
                  </Badge>
                ))
              : null}
          </p>
        </div>
      </CardContent>
    </Card>
  ) : null;
}

export default ProfileCard;
