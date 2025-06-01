import "./globals.css";
import "../lib/polyfills";
import type { Metadata } from "next";

import { 
  // Geist, Geist_Mono, 
  Inter } from "next/font/google";


import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";


import TopNavBarWrapper from "@/components/TopNavBar/TopNavBarWrapper";
import { auth } from "@/auth";
import { Toaster } from "sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Agentic VIS Challenge",
  description: "The website for VISxGenAI Workshop's Agentic VIS Challenge",
  icons: {
    icon: "/fav.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">

      <body className={`${inter.variable}`}>
        <Toaster />
        <TopNavBarWrapper />
        <SessionProvider session={session}>
          <div className="min-h-screen">{children}</div>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
