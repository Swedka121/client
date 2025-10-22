"use client";
import {
  CircleQuestionMarkIcon,
  HomeIcon,
  ImageIcon,
  Newspaper,
  Phone,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import ToggleMenuSidebar from "./ToggleMenuSidebar";
import { ElementType } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const items: { title: string; url: string; icon: ElementType }[] = [
  { title: "Дім", url: "/", icon: HomeIcon },
  { title: "Про нас", url: "/#about", icon: CircleQuestionMarkIcon },
  { title: "Контакти", url: "/#contacts", icon: Phone },
  { title: "Блог", url: "/blog", icon: Newspaper },
  { title: "Галерея", url: "/gallery", icon: ImageIcon },
];

function MenuSidebar() {
  const sidebar = useSidebar();
  const mobile = useIsMobile();
  return mobile ? (
    <Sidebar side="right">
      <SidebarHeader>
        <ToggleMenuSidebar variant="default" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
                        <item.icon className="w-20 h-20" />
                        <span className="text-[1.5rem]">{item.title}</span>
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
  ) : null;
}

export default MenuSidebar;
