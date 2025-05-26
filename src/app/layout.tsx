import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import TopNavBarWrapper from "@/components/TopNavBar/TopNavBarWrapper";
import Footer from "@/components/Footer";
import "../lib/polyfills";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VISxGenAI Challenge",
  description: "The website for VISxGenAI Workshop Challenge",
  icons: {
    icon: "/fav.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <TopNavBarWrapper />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
