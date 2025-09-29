"use client";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

function ToggleMenuSidebar({ variant }: { variant: "default" | "secondary" }) {
  const sidebar = useSidebar();
  return (
    <Button
      variant={variant}
      onClick={() => {
        sidebar.toggleSidebar();
      }}
      className="h-15 w-40 font-bold text-[0.9rem]"
    >
      <Menu /> Меню
    </Button>
  );
}

export default ToggleMenuSidebar;
