"use client";
import BlogCreateButton from "@/components/AdminComp/BlogCreateButton";
import BlogCreateContent from "@/components/AdminComp/BlogCreateContent";
import BlogCreateForm from "@/components/AdminComp/BlogCreateForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Page() {
  return (
    <section className="flex flex-col gap-[20px] w-1/2 h-full overflow-y-scroll items-center justify-center pt-10 pb-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create form</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogCreateForm />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogCreateContent />
        </CardContent>
      </Card>
      <BlogCreateButton />
    </section>
  );
}

export default Page;
