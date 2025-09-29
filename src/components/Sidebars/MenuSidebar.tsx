"use client";
import {
  CircleQuestionMarkIcon,
  HomeIcon,
  Image,
  Newspaper,
  Phone,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import ToggleMenuSidebar from "./ToggleMenuSidebar";
import { ElementType } from "react";

const items: { title: string; url: string; icon: ElementType }[] = [
  { title: "Дім", url: "/", icon: HomeIcon },
  { title: "Про нас", url: "/#about", icon: CircleQuestionMarkIcon },
  { title: "Контакти", url: "/#contacts", icon: Phone },
  { title: "Блог", url: "/blog", icon: Newspaper },
  { title: "Галерея", url: "/gallery", icon: Image },
];

function MenuSidebar() {
  const sidebar = useSidebar();
  return (
    <Sidebar side="right">
      <SidebarHeader>
        <ToggleMenuSidebar variant="default" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-30">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="h-30">
                      <Button
                        className="w-full h-full"
                        onClick={() => {
                          sidebar.toggleSidebar();
                        }}
                      >
                        <item.icon />
                        <span className="text-[1.2rem]">{item.title}</span>
                      </Button>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default MenuSidebar;
