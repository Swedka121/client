import { headers } from "next/headers";
import { userAgent } from "next/server";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavigationMenu, NavigationMenuLink } from "../ui/navigation-menu";
import {
  CircleQuestionMark,
  HomeIcon,
  ImageIcon,
  Newspaper,
  Phone,
} from "lucide-react";
import LoginButton from "../LoginComp/LoginButton";
import Container from "../ui/container";
import ToggleMenuSidebar from "../Sidebars/ToggleMenuSidebar";

async function MainHeader() {
  const mobile =
    userAgent({ headers: await headers() }).device.type == "mobile";
  return mobile ? (
    <header className="h-25 w-full bg-(--header-foreground) fixed z-[1]">
      <Container>
        <div className="flex flex-row w-full h-full justify-between items-center">
          <div className="flex flex-row items-center justify-start gap-[10px] h-25 w-content">
            <Avatar className="size-14">
              <AvatarImage
                src="/assets/logo.png"
                width={60}
                height={60}
              ></AvatarImage>
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
            <p className="font-[Montserrat] text-[1.7rem] text-white font-bold h-[20px]">
              Ліцей №23
            </p>
          </div>
          <ToggleMenuSidebar variant="secondary" />
        </div>
      </Container>
    </header>
  ) : (
    <header className="mt-[50px] fixed w-[100%] z-[2]">
      <div className="w-[90%] m-auto">
        <Card>
          <CardContent className="flex flex-row itrems-center gap-[50px]">
            <div className="flex flex-row items-center justify-start gap-[10px] h-15 w-max">
              <Avatar className="size-12">
                <AvatarImage
                  src="/assets/logo.png"
                  width={60}
                  height={60}
                ></AvatarImage>
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <p className="font-[Montserrat] text-[1.7rem] font-bold ">
                Ліцей №23
              </p>
            </div>
            <NavigationMenu className="flex flex-row gap-[10px]">
              <NavigationMenuLink
                className="flex flex-row itrems-center gap-[10px]"
                href="/"
              >
                <HomeIcon className="size-[1.3rem]" /> Дім
              </NavigationMenuLink>
              <NavigationMenuLink
                className="flex flex-row itrems-center gap-[10px]"
                href="/#about"
              >
                <CircleQuestionMark className="size-[1.3rem]" /> Про нас
              </NavigationMenuLink>
              <NavigationMenuLink
                className="flex flex-row itrems-center gap-[10px]"
                href="/#contacts"
              >
                <Phone className="size-[1.3rem]" /> Контакти
              </NavigationMenuLink>
              <NavigationMenuLink
                className="flex flex-row itrems-center gap-[10px]"
                href="/blog"
              >
                <Newspaper className="size-[1.3rem]" /> Блог
              </NavigationMenuLink>
              <NavigationMenuLink
                className="flex flex-row itrems-center gap-[10px]"
                href="/gallery"
              >
                <ImageIcon className="size-[1.3rem]" /> Галерея
              </NavigationMenuLink>
            </NavigationMenu>

            <LoginButton />
          </CardContent>
        </Card>
      </div>
    </header>
  );
}

export default MainHeader;
