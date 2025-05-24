import "./globals.css";
import "../lib/polyfills";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import TopNavBarWrapper from "@/components/TopNavBar/TopNavBarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agent & VIS",
  description: "The website for AI Agent & VIS workshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TopNavBarWrapper />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
