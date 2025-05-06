import TopNavBar from "@/components/TopNavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";

export default async function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <div className="flex flex-col">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full flex flex-col">
          <div className="flex flex-row items-center px-4 border-b">
            <SidebarTrigger />
            <TopNavBar />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
