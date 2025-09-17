"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

function ContactForm() {
  const form = useForm();
  return (
    <Card className="w-1/2 h-auto">
      <CardHeader>
        <CardTitle>Контактна форма</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-[20px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пошта</FormLabel>
                  <FormControl>
                    <Input placeholder="my.mail@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ми будемо використовувати цю пошту щоб зв`язатися з вами
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Що у вас на думці?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Що у вас на думці"
                      {...field}
                      className="max-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button>Надіслати</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
