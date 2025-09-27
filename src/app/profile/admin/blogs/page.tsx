"use client";
import BlogsList from "@/components/AdminComp/BlogsList";
import { Card, CardContent } from "@/components/ui/card";

function Page() {
  return (
    <Card>
      <CardContent>
        <BlogsList />
      </CardContent>
    </Card>
  );
}

export default Page;
