import ContactForm from "@/components/ContactForm";
import NewsConatiner from "@/components/NewsComp/NewsContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  HomeIcon,
  Mail,
  Phone,
  CircleQuestionMark,
  ImageIcon,
  Newspaper,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import LoginButton from "@/components/LoginComp/LoginButton";
import Image from "next/image";
import { Metadata } from "next";
import axios from "axios";
import { blogTableContent } from "../../stores/blogsTableStore";

export const metadata: Metadata = {
  title: "Lyzeum №23",
  description: "Site of Lyzeum №23 of Zhytomyr",
  keywords: ["Lyzeum", "Blogs", "Zhytomyr"],
};
// import * as uuid from "uuid";

async function getBlogs() {
  const data = (
    await axios
      .get("/blog/", {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      })
      .catch(() => {
        return { data: [] };
      })
  ).data as { _doc: blogTableContent }[];
  while (data.length <= 8) {
    console.log("Add!");
    data.push({
      _doc: {
        _id: "none",
        title: "Цеї новини ще немає",
        description: "Опис для новини що немає ?_?",
        author: { username: "Невідомий", avatar: "" },
        avatar:
          "https://i.fbcd.co/products/resized/resized-750-500/37-0a622f4a64fea4d65ea67779289cafdf1e36d2422807ca40e3798db4c9553910.jpg",
        comments: 0,
        content: [],
      },
    });
  }
  return data.map((el) => ({ ...el._doc }));
}

export default async function Home() {
  const blogs = await getBlogs();
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
      <main className="flex flex-col row-start-2 itrems-center sm:itrems-start">
        <Container>
          <section className="w-full h-[100vh] flex items-center justify-center flex-row ">
            <div className="w-1/2 flex justify-center itrems-center">
              <Card className="w-[15vw] h-auto font-[Montserrat]">
                <CardContent className="flex flex-col justify-between gap-[30px]">
                  <h3 className="text-[1.5rem]/[1.5rem] font-bold">
                    Вітаємо вас на сайті Ліцею №23 м. Житомира
                  </h3>
                  <p className="w-full break-keep text-[0.8rem]">
                    Ми раді бачити вас на офіційному сайті нашого ліцею! Тут ви
                    знайдете свіжі новини, корисні матеріали та інформацію про
                    життя нашої шкільної родини.
                    <br />
                    <br />
                    📌 Блоги з актуальними новинами та подіями ліцею
                    <br />
                    <br />
                    📸 У Галереї ви зможете переглянути фото з найяскравіших
                    подій та заходів ліцею.
                    <br />
                    <br />
                    ✉️ А за допомогою форми зворотного зв’язку ви завжди можете
                    написати нам, поставити запитання чи поділитися
                    пропозиціями.
                    <br />
                    <br />
                    Разом ми створюємо простір для навчання, розвитку та
                    натхнення!
                  </p>
                  <Button>Написати</Button>
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center border-l-[20] border-(--foreground)">
              <Image
                className="w-1/2 h-full absolute z-[-10] right-[-20] brightness-60 rounded-l-[50]"
                src={"/assets/main.jpg"}
                width={500}
                height={600}
                alt="main"
              ></Image>
              <div className="w-1/2 h-full absolute right-0 z-[-11] bg-(--foreground)"></div>
              <h2 className="w-full text-[19rem]/[18rem] tracking-tight pl-10 text-white">
                ЛІЦЕЙ 23 <br /> м. ЖИТОМИРА
              </h2>
            </div>

            {/* <Object1 /> */}
          </section>
        </Container>
        <section
          className="bg-(--foreground) w-full h-[100vh] flex flex-row"
          id="about"
        >
          <div className="bg-white w-1/2 h-full flex justify-center items-center">
            <Image
              src={"/assets/ill-1.jpg"}
              alt="ill"
              width={700}
              height={700}
              className="w-3/4 h-auto"
            />
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <h3 className="text-white font-[Conthic] text-[5rem]/[5rem]">
              ПРО НАС
            </h3>
            <p className="w-1/2 h-auto text-white font-[Montserrat] text-center mt-5">
              Ліцей №23 м. Житомира — це сучасний навчальний заклад, де
              поєднуються традиції та інновації. Ми створюємо умови для
              всебічного розвитку учнів, їхніх талантів та здібностей.
              <br />
              <br />
              У ліцеї навчаються допитливі, творчі та активні діти, яких
              підтримує команда професійних педагогів. Наші учні беруть участь у
              конкурсах, олімпіадах, спортивних змаганнях і досягають високих
              результатів.
              <br />
              <br />
              Ми пишаємося теплим та дружнім шкільним середовищем, адже ліцей —
              це не лише місце навчання, а й простір для спілкування, співпраці
              та нових ідей.
              <br />
              <br />
            </p>
            <h3 className="text-white font-[Conthic] text-[5rem]/[5rem] mt-15">
              ДЕ МИ ЗНАХОДИМОСЬ?
            </h3>
            <iframe
              className="mt-5 w-5/6 h-[40vh]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.979945031852!2d28.664012277571775!3d50.25495885141906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472c65910a6bf14f%3A0x8cbd7bb491052f7b!2z0JbQuNGC0L7QvNC40YDRgdGM0LrQsCDQvNGW0YHRjNC60LAg0LPRg9C80LDQvdGW0YLQsNGA0L3QsCDQs9GW0LzQvdCw0LfRltGPIOKEljIzINGW0LwuINCcLiDQntGH0LXRgNC10YLQsA!5e0!3m2!1suk!2sua!4v1757603187494!5m2!1suk!2sua"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="text-[0.7rem] font-[Montserrat] text-white mt-1">
              вулиця Бориса Лятошинського, 14, Житомир, Житомирська область,
              10014
            </p>
          </div>
        </section>
        <section className="w-full h-[100vh] bg-(--foreground)">
          <Container>
            <h3 className="text-[6rem] font-[Conthic] text-white mt-5">
              НАШІ НОВИНИ ТА БЛОГИ
            </h3>
            <NewsConatiner blogs={blogs} />
          </Container>
        </section>
        <section className="w-full h-[100vh] flex flex-row " id="contacts">
          <div className="w-1/2 h-full bg-(--foreground) p-8 flex flex-col items-center justify-center gap-[50px]">
            <ContactForm />
            <h2 className="w-full text-[18rem]/[18rem] text-center text-white">
              АБО
            </h2>
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle>Позвони нам або напиши на пошту</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="flex flex-row items-center gap-[20px]">
                    - <Phone className="w-[2rem]" /> +380 63 000 0000
                  </span>

                  <br />
                  <span className="flex flex-row items-center gap-[20px]">
                    - <Mail className="w-[2rem]" /> my.mail@gmail.com
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="w-1/2 h-full flex items-center">
            <h2 className="w-1/2 text-[20rem]/[18rem]">
              НАПИШИ <br /> НАМ
            </h2>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </>
  );
}
