"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBlogsTable } from "../../../stores/blogsTableStore";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Заголовок має бути довше ніж 3 символи" })
    .max(150, { error: "Заголовок має бути менше ніж 150 символів" }),
  description: z
    .string()
    .min(3, { error: "Опис має бути не менше ніж 3 символи" })
    .max(600, { error: "Опис має бути не більше 600 символів" }),
  avatar: z.url({ error: "Тут можуть бути лише посилання на картинку" }),
});

function BlogCreateForm() {
  const store = useBlogsTable();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      avatar: "",
    },
    mode: "onChange",
  });

  form.watch((formState) => {
    store.setCreateTitle(formState.title || "");
    store.setCreateDesc(formState.description || "");
    store.setCreateAvatar(formState.avatar || "");
  });
  return (
    <Form {...form}>
      <div className="flex flex-col gap-[20px]">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Вкажіть заголовок..." {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Короткий опис</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-[200px]"
                  placeholder="Вкажіть короткий опис..."
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="avatar"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватар</FormLabel>
              <FormControl>
                <Input placeholder="Вкажіть аватар..." {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </div>
    </Form>
  );
}

export default BlogCreateForm;
