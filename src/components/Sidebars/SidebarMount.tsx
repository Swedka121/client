"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";

function SidebarMount({ children }: { children: ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

export default SidebarMount;
