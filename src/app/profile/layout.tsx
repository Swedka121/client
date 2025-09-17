import ProfileSidebar from "@/components/Sidebars/ProfileSidebar";
import SidebarMount from "@/components/Sidebars/SidebarMount";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Lyzeum №23 | Profile",
  description: "Site of Lyzeum №23 of Zhytomyr",
  keywords: ["Lyzeum", "Blogs", "Zhytomyr"],
};

function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarMount>
      <aside>
        <ProfileSidebar />
      </aside>
      <section className="size-auto w-[90vw] flex justify-center items-center">
        {children}
      </section>
    </SidebarMount>
  );
}

export default Layout;
