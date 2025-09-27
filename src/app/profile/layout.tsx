"use client";
import ProfileSidebar from "@/components/Sidebars/ProfileSidebar";
import SidebarMount from "@/components/Sidebars/SidebarMount";
import { ReactNode, useEffect, useRef } from "react";
import { animate } from "animejs";
import { usePathname } from "next/navigation";

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (pathname?.includes("profile")) {
      animate(containerRef.current, {
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 500,
      });
    } else {
      animate(containerRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 400,
      });
    }
  }, [pathname]);

  return (
    <SidebarMount>
      <aside>
        <ProfileSidebar />
      </aside>
      <section
        ref={containerRef}
        className="size-auto w-[90vw] flex justify-center items-center"
      >
        {children}
      </section>
    </SidebarMount>
  );
}

export default Layout;
