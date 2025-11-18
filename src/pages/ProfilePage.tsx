import Animate from "@components/Animate";
import FileCard from "@components/pageComp/FileCard";
import HeaderMain from "@components/pageComp/HeaderMain";
import Button from "@components/ui/Button";
import Card, { CardTitle } from "@components/ui/Card";
import Input from "@components/ui/Input";
import Progress from "@components/ui/Progress";
import Tag from "@components/ui/Tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguagePack } from "@hooks/useLanguagePack";
import { useProfileStore } from "@stores/profileStore";
import { useStorageStore } from "@stores/storageStore";
import { FileIcon, PencilIcon, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

const form1Schema = z.object({
  username: z.string().min(3, "Username must be bigger than 3 letters"),
});
const form2Schema = z.object({
  avatar: z.instanceof(FileList).refine((a) => a.item(0).size > 0),
});

function ProfilePage() {
  const profileStore = useProfileStore();
  const storageStore = useStorageStore();
  const languagePack = useLanguagePack();
  const navigate = useNavigate();

  const form1 = useForm({
    resolver: zodResolver(form1Schema),
    reValidateMode: "onChange",
  });
  const form2 = useForm({
    resolver: zodResolver(form2Schema),
    reValidateMode: "onChange",
  });

  const handleSubmit1 = form1.handleSubmit((data) => {
    profileStore.updateName(data.username);
  });
  const handleSubmit2 = form2.handleSubmit((data) => {
    profileStore.updateAvatar(data.avatar[0]);
  });

  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <Animate rootRef={rootRef}>
      <div className="flex flex-col h-full">
        <HeaderMain />
        <div className="flex flex-row gap-5 items-center">
          <h1 className="text-[3rem] font-bold">
            {languagePack.page_profile_title}
          </h1>
        </div>
        <div
          ref={rootRef}
          className="gap-5 mt-10 w-full h-full grid grid-cols-3 xl:grid-cols-4 grid-rows-[400px_1fr] pb-10"
        >
          <Card className="w-full h-full">
            <CardTitle>
              <User />
              {languagePack.page_card_profile_data}
            </CardTitle>
            <div className="w-full h-max flex flex-col items-center justify-center">
              <img
                className="w-50 h-50 rounded-full mt-10 mb-10"
                src={`http://localhost:4565/public/${profileStore.avatar}`}
                alt="profile avatar"
              ></img>
              <p className="text-[1.0rem] font-light">@{profileStore.name}</p>
            </div>
          </Card>
          <Card className="w-full h-full col-span-2 xl:col-span-3">
            <div className="flex flex-col gap-5">
              <CardTitle>
                <PencilIcon />
                {languagePack.page_card_profile_change}
              </CardTitle>
              <form
                className="flex flex-row gap-5 items-end"
                onSubmit={handleSubmit1}
              >
                <Input
                  {...form1.register("username")}
                  placeholder={
                    languagePack.page_card_profile_change_username_placeholder
                  }
                  label={languagePack.page_card_profile_change_username_title}
                  error={form1.formState.errors.username?.message}
                ></Input>
                <Button className="w-30 h-13" type="submit">
                  {languagePack.page_card_profile_change_username_button}
                </Button>
              </form>
              <form
                className="flex flex-row gap-5 items-end"
                onSubmit={handleSubmit2}
              >
                <Input
                  {...form2.register("avatar")}
                  placeholder={
                    languagePack.page_card_profile_change_avatar_placeholder
                  }
                  label={languagePack.page_card_profile_change_avatar_title}
                  type="file"
                  error={form2.formState.errors.avatar?.message}
                ></Input>
                <Button className="w-30 h-13" type="submit">
                  {languagePack.page_card_profile_change_avatar_button}
                </Button>
              </form>
              <div className="w-full h-fit gap-5 grid grid-cols-2 mt-5">
                <Button
                  className="w-full bg-(--secd-color)"
                  onClick={async () => {
                    await window.token.logout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
                <Button
                  className="w-full bg-(--secd-color)"
                  onClick={async () => {
                    await window.token.logout();
                    navigate("/");
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
          <Card className="w-full h-max min-h-[500px] col-span-full">
            <CardTitle>
              <FileIcon /> File storage
            </CardTitle>
            <div className="w-full pt-2 pb-2">
              <h2 className="pb-1 pt-1 font-medium text-(--black-main)">
                {Number(storageStore.spaced / 1000 / 1000).toFixed(2)}Mb/
                {storageStore.diskSpace / 1000 / 1000}Mb
              </h2>
              <Progress
                percent={Math.ceil(
                  storageStore.spaced / storageStore.diskSpace
                )}
              />
            </div>
            <div className="flex flex-row flex-wrap w-full h-max gap-2 mt-1">
              {Array.from(storageStore.tags.values()).map((el) => (
                <Tag
                  name={el}
                  key={el}
                  selected={storageStore.selectedTag == el}
                  clickCallback={() => {
                    storageStore.setTag(el);
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 4xl:grid-cols-6 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3 grid-rows-auto w-full h-max gap-4 mt-2">
              {storageStore.getFiltredFiles().map((el) => (
                <FileCard {...el} key={el.path} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Animate>
  );
}

export default ProfilePage;
