import HeaderMain from "@components/pageComp/HeaderMain";
import Avatar from "@components/ui/Avatar";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import LaptopMock from "@components/ui/LaptopMock";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguagePack } from "@hooks/useLanguagePack";
import { useCourseStore } from "@stores/courseStore";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { data, Link } from "react-router";
import z from "zod";

const IMAGES = ["image/png", "image/jpeg", "image/webp"];

const form1Schema = z.object({
  baner: z.instanceof(FileList).refine((el) => {
    return IMAGES.includes(el.item(0).type);
  }),
});

const form2Schema = z.object({
  avatar: z.instanceof(FileList).refine((el) => {
    return IMAGES.includes(el.item(0).type);
  }),
});

const form3Schema = z.object({
  name: z.string().min(3).max(60),
});

function CreateCoursePage() {
  const courseStore = useCourseStore();
  const form1 = useForm({
    resolver: zodResolver(form1Schema),
    mode: "onChange",
  });
  const form2 = useForm({
    resolver: zodResolver(form2Schema),
    mode: "onChange",
  });
  const form3 = useForm({
    resolver: zodResolver(form3Schema),
    mode: "onChange",
  });

  const onSub1 = form1.handleSubmit((data) => {
    courseStore.setBanerCreate(data.baner[0]);
  });

  const onSub2 = form2.handleSubmit((data) => {
    courseStore.setAvatarCreate(data.avatar[0]);
  });

  const onSub3 = form3.handleSubmit((data) => {
    courseStore.setNameCreate(data.name);
  });

  const languagePack = useLanguagePack();

  return (
    <section className="flex flex-col">
      <div className="w-full h-20 flex flex-row items-center pt-4 pb-4">
        <Link to="/app/main">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex flex-col gap-5 w-full items-center">
        <article className="flex flex-row gap-5">
          <LaptopMock
            mockHref={`${import.meta.env.VITE_SERVER_URL}/public/${courseStore.create_baner}`}
            className="w-90 h-90 rounded-lg overflow-hidden"
          />
          <div className="flex flex-col gap-5">
            <h2 className="text-[2rem] font-medium">
              {languagePack.page_create_course_baner_title}
            </h2>
            <p className="text-[0.9rem] font-regular max-w-100">
              {languagePack.page_create_course_baner_desc}
            </p>
            <form className="flex flex-col gap-3" onSubmit={onSub1}>
              <Input
                type="file"
                {...form1.register("baner")}
                error={form1.formState.errors.baner?.message}
              ></Input>
              <Button type="submit" className="w-full">
                {languagePack.page_create_course_change_button}
              </Button>
            </form>
          </div>
        </article>
        <article className="flex flex-row gap-5">
          <div className="w-90 h-90 flex justify-center items-center">
            <Avatar className="w-60 h-60" image={courseStore.create_avatar} />
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-[2rem] font-medium">
              {languagePack.page_create_course_avatar_title}
            </h2>
            <p className="text-[0.9rem] font-regular max-w-100">
              {languagePack.page_create_course_avatar_desc}
            </p>
            <form className="flex flex-col gap-3" onSubmit={onSub2}>
              <Input
                type="file"
                {...form2.register("avatar")}
                error={form2.formState.errors.avatar?.message}
              ></Input>
              <Button type="submit" className="w-full">
                {languagePack.page_create_course_change_button}
              </Button>
            </form>
          </div>
        </article>
        <article className="flex flex-row gap-5">
          <div className="w-90 h-90 flex justify-center items-center">
            <p className="w-max max-w-1/9 min-w-3/9">
              @{courseStore.create_name}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-[2rem] font-medium">
              {languagePack.page_create_course_avatar_course_name_title}
            </h2>
            <p className="text-[0.9rem] font-regular max-w-100">
              {languagePack.page_create_course_avatar_course_name_desc}
            </p>
            <form className="flex flex-col gap-3" onSubmit={onSub3}>
              <Input
                placeholder="Введіть назву курсу"
                {...form3.register("name")}
                error={form3.formState.errors.name?.message}
              ></Input>
              <Button type="submit" className="w-full">
                {languagePack.page_create_course_change_button}
              </Button>
            </form>
          </div>
        </article>
        <Button
          className="w-200 mt-10"
          onClick={() => {
            courseStore.create();
          }}
        >
          {languagePack.page_create_course_create_button}
        </Button>
      </div>
    </section>
  );
}

export default CreateCoursePage;
