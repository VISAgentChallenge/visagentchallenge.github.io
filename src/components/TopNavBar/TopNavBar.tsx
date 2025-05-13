"use client";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, UserRound, Milestone, Home } from "lucide-react";
import { logout } from "@/actions/logout";
import { redirect, useRouter } from "next/navigation";
import { signIn, signOut } from "@/auth";

export default function TopNavBar({ session }: { session: any }) {
  const router = useRouter();

  // const handleLogin = async () => {
  //   try {
  //     console.log("Logging in on client side...");
  //     await login();
  //     router.refresh();
  //   } catch (error) {
  //     console.error("Error during login client side:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {}
  };

  return (
    <nav className="p-4 w-full border-b">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">VIS Workshop</div>
        <div className="flex space-x-4">
          <Button variant={"ghost"} onClick={() => redirect("/")}>
            <Home className="h-5 w-5" />
            <span>Overview</span>
          </Button>
          <Button variant={"ghost"} onClick={() => redirect("/challenge")}>
            <Milestone className="h-5 w-5" />
            <span>Challenge</span>
          </Button>
          {session?.user && (
            <Button variant={"ghost"} onClick={() => redirect("/home")}>
              <UserRound className="h-5 w-5" />
              <span>Home</span>
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
            // <form action={handleLogin}>
            //   <Button variant="ghost">
            //     <LogIn className="h-5 w-5" />
            //     <span>Login</span>
            //   </Button>
            // </form>
          )}
        </div>
      </div>
    </nav>
  );
}
