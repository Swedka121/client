import { useEffect, useRef } from "react";
import { ArrowLeft, FileIcon } from "lucide-react";
import { Editor as ToastEditor } from "@toast-ui/react-editor";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@components/ui/Input";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useStorageStore } from "@stores/storageStore";
import { useCourseStore } from "@stores/courseStore";
import { languagePack } from "app";
import { useLanguagePack } from "@hooks/useLanguagePack";

const materialSchema = z.object({
  title: z.string().min(3).max(100),
});

type MaterialForm = z.infer<typeof materialSchema>;

export default function CreateMaterialPage() {
  const router = useNavigate();
  const editorRef = useRef<ToastEditor>(null);
  const courseStore = useCourseStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialForm>({
    resolver: zodResolver(materialSchema),
    defaultValues: { title: "" },
  });

  const languagePack = useLanguagePack();

  const onSubmit = (data: MaterialForm) => {
    const content = editorRef.current?.getInstance().getMarkdown() || "";

    courseStore.createMaterial(data.title, content);
    router(-1);
  };

  useEffect(() => {
    editorRef.current
      ?.getInstance()
      .addHook(
        "addImageBlobHook",
        async (blob: File, callback: (arg1: string, arg2: string) => void) => {
          try {
            const fileName = await useStorageStore.getState().loadFile(blob);

            callback(
              `${import.meta.env.VITE_SERVER_URL}/public/${fileName}`,
              "image"
            );
          } catch (err) {
            console.error("Image upload failed", err);
          }
        }
      );
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="w-full h-20 flex flex-row items-center pt-4 pb-4 ">
        <ArrowLeft className="cursor-pointer" onClick={() => router(-1)} />
      </div>

      <div className="w-full flex flex-row gap-5 items-center">
        <div className="h-15 w-15 bg-(--main-color) rounded-full flex items-center justify-center">
          <FileIcon color="var(--static-white-main)" />
        </div>

        <Input
          label={languagePack.page_material_new_main_title}
          {...register("title")}
          error={errors.title?.message}
        />
      </div>

      <div className="bg-white rounded shadow mt-10">
        <ToastEditor
          ref={editorRef}
          initialValue=""
          previewStyle="vertical"
          height="1000px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-(--main-color) text-white font-bold p-3 rounded-lg w-64"
      >
        {languagePack.page_material_new_save_button}
      </button>
    </form>
  );
}
