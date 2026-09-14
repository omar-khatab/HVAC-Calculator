import type { Metadata } from "next";
import { Geist, Geist_Mono, Italiana } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HVAC Calculator - BTU & Duct Sizer",
  description: "Engineering tool built with Next.js + TypeScript by Omar Khatab"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="">
        <NavBar/>
        <h1 className="text-7xl font-light m-10 text-center">
          Quick Cooling <i className="text-gray-600">load Calc</i> for any room.
          </h1>
        {children}
      </body>
    </html>
  );
}
