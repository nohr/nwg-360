import "./globals.css";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
import Nav from "@/components/nav";
import Splash from "./splash";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className=" overflow-y-scroll text-slate-900/50 dark:text-slate-200/50"
    >
      <body
        className={`${inter.className} flex flex-row gap-8 py-16 [&>*]:mx-4 md:[&>*]:mx-12`}
      >
        <Splash />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
