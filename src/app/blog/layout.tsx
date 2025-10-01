import MainHeader from "@/components/Headers/MainHeader";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}

export default Layout;
