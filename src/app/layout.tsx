import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./components/ui/Navbar";
import PrelineScript from "./components/PrelineScript";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canteensync",
  description: "call your food at your desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Navbar /> */}
        {/* <div className="w-11/12 mx-auto"> */}
        <Toaster position="top-center" />
        {children}
        {/* </div> */}
        <PrelineScript />
      </body>
    </html>
  );
}
