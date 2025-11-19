import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCourseStore } from "@stores/courseStore";
import { useLanguagePack } from "@hooks/useLanguagePack";

const form1Schema = z.object({
  data: z.string().length(10),
});

function ConnectByCodePage() {
  const router = useNavigate();
  const courseStore = useCourseStore();
  const form1 = useForm({
    resolver: zodResolver(form1Schema),
    mode: "onChange",
  });

  const onSub1 = form1.handleSubmit((data) => {
    courseStore.addCourseByCode(data.data);
    router("/app/main");
  });

  const languagePack = useLanguagePack();

  return (
    <section className="flex flex-col">
      <div className="w-full h-20 flex flex-row items-center pt-4 pb-4 ">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            router(-1);
          }}
        />
      </div>
      <form
        onSubmit={onSub1}
        className="w-full min-h-[90vh] flex justify-center items-center"
      >
        <div className="h-50 w-200">
          <Input
            label={languagePack.page_connect_title}
            error={form1.formState.errors?.data?.message}
            placeholder={languagePack.page_connect_placeholder}
            {...form1.register("data")}
          ></Input>
          <Button className="w-full mt-5" type="submit">
            {languagePack.page_connect_button}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ConnectByCodePage;
