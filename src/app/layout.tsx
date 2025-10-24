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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="google-site-verification"
          content="K1Eccn_PYfEMvcl_HpIrRE2h1YKOzaxFT0SZfMnK5L0"
        />
      </head>
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
