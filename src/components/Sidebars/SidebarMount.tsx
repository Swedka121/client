"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";

function SidebarMount({
  children,
  defaultOpen,
}: {
  children: ReactNode;
  defaultOpen: boolean;
}) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "400px",
        } as React.CSSProperties
      }
    >
      {children}
    </SidebarProvider>
  );
}

export default SidebarMount;
