"use client";

import { Button } from "@/components/ui/button";
import { LogOut, LogIn, Milestone, Home, Layers2, Book } from "lucide-react";
import { logout } from "@/actions/logout";
import { redirect, useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function TopNavBar({ session }: { session: Session | null }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="p-4 w-full border-b">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
          <a onClick={() => redirect("/")} className="hover:text-[#7a0019] text-lg font-bold cursor-pointer"> 
            AI Agent & VIS workshop 2025
          </a>
        <div className="flex space-x-4">
          <Button variant={"ghost"} onClick={() => redirect("/")}>
            <Home className="h-5 w-5" />
            <span>Overview</span>
          </Button>
          <Button variant={"ghost"} onClick={() => redirect("/challenge")}>
            <Milestone className="h-5 w-5" />
            <span>Challenge</span>
          </Button>
          <Button variant={"ghost"} onClick={() => redirect("/guides")}>
            <Book className="h-5 w-5" />
            <span>Guides</span>
          </Button>
          {session?.user && (
            <Button variant={"ghost"} onClick={() => redirect("/submission")}>
              <Layers2 className="h-5 w-5" />
              <span>Submissions</span>
            </Button>
          )}
          {session?.user ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => redirect("/signin")}>
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
