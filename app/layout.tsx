import type { Metadata } from "next";
import { Rajdhani, Tomorrow } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LanguageProvider from "@/contexts/language-context";

const rajdhani = Rajdhani({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const tomorrow = Tomorrow({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-tomorrow",
});

const agencyFb = localFont({
  src: [
    {
      path: "../public/fonts/agencyfb_bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/agencyfb_reg.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-agencyFb",
});

export const metadata: Metadata = {
  title: "VB",
  description: "Vladislav Bondarchuk portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${tomorrow.variable} ${agencyFb.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
