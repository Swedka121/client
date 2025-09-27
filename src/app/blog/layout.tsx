import LoginButton from "@/components/LoginComp/LoginButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  CircleQuestionMark,
  HomeIcon,
  ImageIcon,
  Newspaper,
  Phone,
} from "lucide-react";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="mt-[50px] fixed w-[100%]">
        <div className="w-[90%] m-auto">
          <Card>
            <CardContent className="flex flex-row itrems-center gap-[50px]">
              <div className="flex flex-row itrems-center gap-[10px]">
                <p className="font-[Montserrat] text-lg">Lyzeum 23</p>
                <Avatar>
                  <AvatarImage src="/assets/logo.png"></AvatarImage>
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
              </div>
              <NavigationMenu className="flex flex-row gap-[10px]">
                <NavigationMenuLink
                  className="flex flex-row itrems-center gap-[10px]"
                  href="/"
                >
                  <HomeIcon className="size-[1.3rem]" /> Home
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="flex flex-row itrems-center gap-[10px]"
                  href="/#about"
                >
                  <CircleQuestionMark className="size-[1.3rem]" /> About
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="flex flex-row itrems-center gap-[10px]"
                  href="/#contacts"
                >
                  <Phone className="size-[1.3rem]" /> Contacts
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="flex flex-row itrems-center gap-[10px]"
                  href="/blog"
                >
                  <Newspaper className="size-[1.3rem]" /> Blog
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="flex flex-row itrems-center gap-[10px]"
                  href="/gallery"
                >
                  <ImageIcon className="size-[1.3rem]" /> Gallery
                </NavigationMenuLink>
              </NavigationMenu>
              <LoginButton />
            </CardContent>
          </Card>
        </div>
      </header>
      {children}
    </>
  );
}

export default Layout;
