import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Container from "../ui/container";

function MainFooter() {
  return (
    <footer className="h-max pt-10 pb-10 w-full bg-(--header-foreground)">
      <Container>
        <div className="grid grid-cols-2 grid-rows-1">
          <div className="w-auto h-full">
            <div className="flex flex-row items-center justify-start gap-[10px] h-25 w-content">
              <Avatar className="size-16">
                <AvatarImage
                  src="/assets/logo.png"
                  width={60}
                  height={60}
                ></AvatarImage>
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <p className="font-[Montserrat] text-[1.7rem] text-white font-bold h-auto text-center">
                Ліцей №23
              </p>
            </div>
            <div className="flex flex-col w-full h-max gap-[5px]">
              <p className="text-[1.2rem] text-white text-bold">Меню</p>
              <Link className="text-white h-max w-full" href={"/"}>
                - Дім
              </Link>
              <Link className="text-white h-max w-full" href={"/#contacts"}>
                - Контакти
              </Link>
              <Link className="text-white h-max w-full" href={"/#about"}>
                - Про нас
              </Link>
              <Link className="text-white h-max w-full" href={"/blog"}>
                - Блоги
              </Link>
              <Link className="text-white h-max w-full" href={"/gallery"}>
                - Галерея
              </Link>
              <Link className="text-white h-max w-full" href={"/privacy"}>
                - Privacy Policy
              </Link>
              <Link className="text-white h-max w-full" href={"/terms"}>
                - Terms of Use
              </Link>
            </div>
            <p className="mt-50 text-white">
              © 2025 Swedka121 — Designed & Developed. All rights reserved.
            </p>
          </div>
          <div className="w-auto h-full">
            <div className="w-full h-25 flex items-center">
              <p className="font-[Montserrat] text-[1.7rem] text-white font-regular">
                Соцмережі
              </p>
            </div>
            <div className="flex flex-col w-full h-max gap-[5px]">
              <Link
                className="h-max w-max"
                href={"https://www.facebook.com/gym23.zt/"}
              >
                <div className="w-full flex items-center justify-start gap-[10px] text-white">
                  <Image
                    width={60}
                    height={60}
                    className="w-10 h-10"
                    src={"/assets/facebook_logo.png"}
                    alt="facebook logo"
                  ></Image>
                  <p>Facebook</p>
                </div>
              </Link>
              <Link
                className="h-max w-max"
                href={"https://www.instagram.com/humanitarian_gymnasium_23/"}
              >
                <div className="w-full flex items-center justify-start gap-[10px] text-white">
                  <Image
                    width={60}
                    height={60}
                    className="w-10 h-10"
                    src={"/assets/instagram_logo.svg.webp"}
                    alt="instagram logo"
                  ></Image>
                  <p>Instagram</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default MainFooter;
