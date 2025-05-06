import { Button } from "./ui/button";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export default function TopNavBar() {
  const handleLogout = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <nav className="p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold"></div>
        <div className="flex space-x-4">
          {/* add theme provider */}
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
