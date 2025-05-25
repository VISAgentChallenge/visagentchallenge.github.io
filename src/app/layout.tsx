import "./globals.css";
import "../lib/polyfills";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import TopNavBarWrapper from "@/components/TopNavBar/TopNavBarWrapper";
import { auth } from "@/auth";
import { Toaster } from "sonner";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
