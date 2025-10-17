import MainFooter from "@/components/Footers/MainFooter";
import MainHeader from "@/components/Headers/MainHeader";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
}

export default Layout;
