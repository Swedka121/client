"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { useUiStore } from "../../../stores/uiStore";

function SidebarMount({ children }: { children: ReactNode }) {
  const uiStore = useUiStore();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "400px",
        } as React.CSSProperties
      }
      open={uiStore.sidebar}
    >
      {children}
    </SidebarProvider>
  );
}

export default SidebarMount;
