"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../../../stores/userStore";
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
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import {
  FileJsonIcon,
  HomeIcon,
  ImageIcon,
  Newspaper,
  User,
} from "lucide-react";
import { ElementType, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";

function ProfileSidebar() {
  const userStore = useUserStore();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const sidebar = useSidebar();

  useEffect(() => {
    sidebar.setOpen(true);
  });
  const items: { title: string; url: string; icon: ElementType }[] = [
    { title: "Профіль", url: "/profile", icon: HomeIcon },
  ];
  const adminPanel: { title: string; url: string; icon: ElementType }[] = [
    { title: "Користувачі", url: "/profile/admin/users", icon: User },
    { title: "Блоги", url: "/profile/admin/blogs", icon: Newspaper },
    { title: "Галерея", url: "/profile/admin/gallery", icon: ImageIcon },
    { title: "Ресурси", url: "/profile/admin/resources", icon: FileJsonIcon },
  ];

  async function onClickLogout() {
    userStore.logout().then(() => {
      router.push("/");
    });
  }
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <Link className="w-full" href="/">
          <Button className="w-full">Назад до головної</Button>
        </Link>
        <Button className="w-full" onClick={onClickLogout}>
          Вийти
        </Button>
        {isAuthenticated ? (
          <Card>
            <CardContent className="flex flex-row items-center justify-center gap-[20px] size-full">
              <Avatar className="size-14">
                <AvatarImage
                  src={
                    userStore.avatar == "default"
                      ? Math.random() >= 0.5
                        ? "/assets/avatar1.jpg"
                        : "/assets/avatar2.jpg"
                      : (userStore.avatar as string)
                  }
                ></AvatarImage>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <p className="text-[0.8rem] font-[Montserrat] text-black font-bold">
                {userStore.username}
              </p>
            </CardContent>
          </Card>
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Основне керування</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {userStore.roles?.includes("admin") ||
        userStore.roles?.includes("manager") ? (
          <SidebarGroup>
            <SidebarGroupLabel>Адмін панель</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminPanel.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
    </Sidebar>
  );
}

export default ProfileSidebar;
