"use client";

import { ColumnDef } from "@tanstack/react-table";
import { blogTableContent } from "../../../stores/blogsTableStore";
import BlogsTable from "./BlogsTable";

const columns: ColumnDef<blogTableContent>[] = [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "avatar",
    header: "avatar",
  },
  {
    accessorKey: "comments",
    header: "comments",
  },
  {
    accessorKey: "author",
    header: "author",
  },
];

function BlogsList() {
  return <BlogsTable columns={columns} data={[]}></BlogsTable>;
}

export default BlogsList;
