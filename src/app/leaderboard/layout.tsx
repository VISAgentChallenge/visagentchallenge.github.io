import TopNavBar from "@/components/TopNavBar";

export default async function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNavBar />
      {children}
    </div>
  );
}
