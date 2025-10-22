import SidebarMount from "@/components/Sidebars/SidebarMount";
import "./globals.css";
import MenuSidebar from "@/components/Sidebars/MenuSidebar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-0 m-0">
        <SidebarMount defaultOpen={false}>
          <Toaster closeButton={true} position="top-center" />
          <main className="w-screen h-screen overflow-x-hidden absolute top-0 left-0">
            {children}
          </main>

          <MenuSidebar />
        </SidebarMount>
      </body>
    </html>
  );
}
