import TopNavBar from "@/components/TopNavBar/TopNavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col">{children}</div>;
}
