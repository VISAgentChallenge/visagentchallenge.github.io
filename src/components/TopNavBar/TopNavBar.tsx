"use client";

import { Button } from "@/components/ui/button";
import { LogOut, LogIn, Milestone, Home, Layers2, Book } from "lucide-react";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default function TopNavBar({ session }: { session: Session | null }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 py-5.5 px-10 font-sans text-lg bg-[#ecf4fa]"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between font-inter">
        {/* Title / Home link */}
        <a
          onClick={() => redirect("/")}
          className="text-[#333] text-xl font-bold cursor-pointer hover:text-[#7a0019] md:text-2xl"
        >
          VIS x GenAI Challenge
        </a>

        {/* Nav buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => redirect("/")}
            className="px-3 py-2 rounded-md text-base transition-colors text-[#333] hover:bg-[#ACD2ED] font-normal"
          >
            <Home className="h-5 w-5" />
            <span>Overview</span>
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => redirect("/challenge")}
            className="px-3 py-2 rounded-md text-base transition-colors text-[#333] hover:bg-[#ACD2ED] font-normal"
          >
            <Milestone className="h-5 w-5" />
            <span>Challenge</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => redirect("/guides")}
            className="px-3 py-2 rounded-md text-base transition-colors text-[#333] hover:bg-[#ACD2ED] font-normal"
          >
            <Book className="h-5 w-5" />
            <span>Guides</span>
          </Button>
          {session?.user && (
            <Button
              variant="ghost"
              onClick={() => redirect("/submission")}
              className="px-3 py-2 rounded-md text-base transition-colors text-[#333] hover:bg-[#ACD2ED] font-normal"
            >
              <Layers2 className="h-5 w-5" />
              <span>Submissions</span>
            </Button>
          )}
          {session?.user ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-base transition-colors text-[#333] hover:bg-[#ACD2ED] font-normal"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => redirect("/signin")}
              className="px-3 py-2 rounded-md text-base transition-colors text-[#333] hover:bg-[#ACD2ED] font-normal"
            >
              <LogIn className="h-5 w-5" />
              <span>Login / Signup</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
