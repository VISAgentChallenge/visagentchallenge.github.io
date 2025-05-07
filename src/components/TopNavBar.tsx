import { Button } from "./ui/button";
import { signOut } from "@/auth";
import { LogOut, LogIn, UsersRound, Milestone } from "lucide-react";

export default function TopNavBar() {
  const handleLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <nav className="p-4 w-full border-b">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">VIS Workshop</div>
        <div className="flex space-x-4">
          {/* add theme provider */}
          <Button variant={"ghost"} >
            <Milestone className="h-5 w-5" />
            <span>Challenge</span>
          </Button>
          <Button variant={"ghost"} >
            <UsersRound className="h-5 w-5" />
            <span>Team</span>
          </Button>
          <Button variant="ghost" >
            <LogIn className="h-5 w-5" />
            <span>Login</span>
          </Button>
          {/* <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button> */}
        </div>
      </div>
    </nav>
  );
}
