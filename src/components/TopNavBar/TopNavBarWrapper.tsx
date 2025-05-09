import { auth } from "@/auth";
import TopNavBar from "@/components/TopNavBar/TopNavBar";

export default async function TopNavBarWrapper() {
  const session = await auth();
  return <TopNavBar session={session} />;
}
