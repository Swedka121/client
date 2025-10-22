export const dynamic = "force-dynamic";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import axios from "axios";
import MainHeader from "@/components/Headers/MainHeader";
import Link from "next/link";
import MainFooter from "@/components/Footers/MainFooter";
import { BlogI } from "../../stores/blogsStore";
import NewsCard from "@/components/NewsComp/NewsCard";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import { GalleryI } from "../../stores/galleryStore";
import ImageResourceServer from "@/components/ResourcesSelectors/ImageResourceServer";

export const metadata: Metadata = {
  title: "Lyceum №23",
  description: "Site of Lyceum №23 of Zhytomyr",
  keywords: ["Lyzeum", "Blogs", "Zhytomyr", "Gallery", "Swedka121"],
  openGraph: {
    images: ["/assets/logo.png"],
  },
};
// import * as uuid from "uuid";

async function getBlogs() {
  const data = (await axios
    .get("/blog/", {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        "Cache-Control": "no-cache",
      },
    })
    .then((data) => data.data)
    .catch(() => {
      return [];
    })) as BlogI[];
  while (data.length <= 8) {
    data.push({
      _id: "none",
      title: "Цеї новини ще немає",
      description: "Опис для новини що немає ?_?",
      author: {
        username: "Невідомий",
        avatar: "68f89c9c09f7943802dfb005",
        googleId: "",
      },
      avatar: "68f89c9c09f7943802dfb005",
      comments: 0,
      content: [],
    });
  }
  return data;
}

async function getGalleryMainCollection() {
  const data = (await axios
    .get("/gallery/Основна", {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      headers: {
        "Cache-Control": "no-cache",
      },
    })
    .then((data) => data.data)
    .catch(() => {
      return { name: "Основна", images: [] };
    })) as GalleryI;

  while (data.images.length < 4) {
    data.images.push({
      _id: "68f89c9c09f7943802dfb005",
      author: {
        username: "Невідомий",
        avatar: "68f89c9c09f7943802dfb005",
        googleId: "",
        email: "",
        roles: ["user"],
      },
      mimeType: "image/jpeg",
      path: "68f89c9c09f7943802dfb005",
      real_name: "file",
    });
  }
  data.images = data.images.map((el) => ({
    ...el,
    path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${el._id}`,
  }));
  return data;
}

export default async function Home() {
  const blogs = await getBlogs();
  const gallery = await getGalleryMainCollection();
  const mobile =
    userAgent({ headers: await headers() }).device.type == "mobile";
  return (
    <>
      <MainHeader />
      <main className="flex flex-col row-start-2 itrems-center sm:itrems-start">
        <Container>
          <section className="w-full h-[100vh] flex items-center justify-center flex-row max-md:flex-col-reverse max-md:items-start max-md:justify-end max-md:h-[100vh]">
            <Image
              className="md:hidden absolute w-full h-[100vh] top-0 left-0 z-[-100]"
              src={"/assets/main.jpg"}
              width={500}
              height={600}
              alt="main"
            ></Image>
            <div className="w-1/2 flex justify-center items-center max-md:w-full max-md:h-max max-md:pt-30 max-md:pb-30">
              <Card className="w-[15vw] h-auto font-[Montserrat] max-md:w-[300px] max-md:h-max">
                <CardContent className="flex flex-col justify-between gap-[30px]">
                  <h3 className="text-[1.5rem]/[1.5rem] font-bold max-md:text-[2rem]/[2rem]">
                    Вітаємо вас на сайті Ліцею №23 м. Житомира
                  </h3>
                  <p className="w-full break-keep text-[0.8rem] max-md:text-[1.1rem]">
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
                  <Link href="#contacts" className="max-md:h-15 ">
                    <Button className="w-full h-full max-md:text-[1.2rem] max-md:font-bold">
                      Написати
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            <div className="max-md:w-full max-md:h-180 w-1/2 h-full flex items-center justify-center border-l-[20] border-(--custom-color) max-md:border-l-[0]">
              <Image
                className="w-1/2 h-full absolute z-[-10] right-[-20] brightness-60 rounded-l-[50] max-md:hidden"
                src={"/assets/main.jpg"}
                width={500}
                height={600}
                alt="main"
              ></Image>
              <div className="w-1/2 h-full absolute right-0 z-[-11] bg-(--custom-color) max-md:hidden"></div>
              <h2 className="w-full text-[19rem]/[18rem] tracking-tight pl-10 text-white max-md:text-[8rem]/[8rem] max-md:pl-0 max-md:font-bolder max-md:pt-10 max-md:pb-10 max-md:text-center max-md:w-full">
                ЛІЦЕЙ 23 <br /> м. ЖИТОМИРА
              </h2>
            </div>

            {/* <Object1 /> */}
          </section>
        </Container>
        <section
          className="bg-(--custom-color) w-full h-[100vh] flex flex-row"
          id="about"
        >
          <div className="bg-white w-1/2 h-full flex justify-center items-center max-md:hidden">
            <Image
              src={"/assets/ill-1.jpg"}
              alt="ill"
              width={700}
              height={700}
              className="w-3/4 h-auto"
            />
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center max-md:w-full max-md:justify-start max-md:pt-30">
            <h3 className="text-white font-[Conthic] text-[5rem]/[5rem] max-md:text-[8rem]/[8rem]">
              ПРО НАС
            </h3>
            <p className="w-3/4 h-auto text-white font-[Montserrat] text-center text-[1.4rem] font-medium mt-5 max-md:w-3/4 max-md:text-[1.5rem] max-md:pt-10">
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
            <h3 className="text-white font-[Conthic] text-[5rem]/[5rem] mt-15 max-md:text-[4rem]">
              ДЕ МИ ЗНАХОДИМОСЬ?
            </h3>
            <iframe
              className="mt-5 w-5/6 h-[40vh] max-md:h-[30vh]"
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
        <section className="w-full h-max pb-20 pt-20 bg-(--custom-color) max-md:pt-20">
          <Container>
            <h3 className="text-[6rem] font-[Conthic] text-white max-md:text-[4rem]/[4rem] max-md:pb-4">
              НАШІ НОВИНИ ТА БЛОГИ
            </h3>
            <div className="w-full h-160 grid grid-cols-4 auto-rows-fr gap-6 max-md:grid-cols-1 max-md:mt-4 max-md:h-max">
              <NewsCard {...blogs[0]} />
              <NewsCard {...blogs[1]} />
              <NewsCard {...blogs[2]} />
              <NewsCard {...blogs[3]} />
              {mobile ? null : (
                <>
                  <NewsCard {...blogs[4]} />
                  <NewsCard {...blogs[5]} />
                  <NewsCard {...blogs[6]} />
                  <NewsCard {...blogs[7]} />
                </>
              )}
            </div>
          </Container>
        </section>
        <section className="w-full h-max pb-20 pt-20 bg-(--custom-color) max-md:pt-20">
          <Container>
            <h3 className="text-[6rem] font-[Conthic] text-white max-md:text-[4rem]/[4rem] max-md:pb-4">
              ГАЛЕРЕЯ
            </h3>
            <div className="w-full h-max grid grid-cols-2 grid-rows-2 max-md:grid-cols-1 max-md:grid-rows-4 gap-6">
              <ImageResourceServer {...gallery.images[0]} />
              <ImageResourceServer {...gallery.images[1]} />
              <ImageResourceServer {...gallery.images[2]} />
              <ImageResourceServer {...gallery.images[3]} />
            </div>
          </Container>
        </section>
        <section
          className="w-full h-max min-h-[100vh] flex flex-row max-md:bg-(--custom-color)"
          id="contacts"
        >
          <div className="w-1/2 h-full min-h-[100vh] bg-(--custom-color) max-md:w-full flex flex-col justify-center items-center gap-[50px]">
            <h3 className="h-full text-white font-[Conthic] text-[5rem]/[5rem] text-center max-md:text-[8rem]/[8rem] md:hidden">
              НАПИШИ НАМ
            </h3>
            <ContactForm />
            <h2 className="w-full text-[18rem]/[18rem] text-white text-center max-md:hidden">
              АБО
            </h2>
            <Card className="w-1/2 max-md:w-3/4">
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
          <div className="w-1/2 h-full min-h-[100vh] flex items-center justify-center max-md:hidden">
            <h2 className="text-[20rem]/[18rem] text-center leading-none text-(--custom-color)">
              НАПИШИ <br /> НАМ
            </h2>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
