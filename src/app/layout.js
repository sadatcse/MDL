import { Geist, Geist_Mono } from "next/font/google";
import LayoutContent from "@/components/LayoutContent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { preinit } from 'react-dom';

export const metadata = {
  title: "Mohammadi Developers Ltd",
  description: "Official Website of Mohammadi Developers Ltd.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  preinit("/theme-loader.js", { as: "script" });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-500">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
