import { Button } from "./ui/button";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function TopNavBar() {
  const handleLogout = async () => {
    "use server";
    await signOut({redirectTo: "/"});
  };

  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Agent Leaderboard</div>
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
