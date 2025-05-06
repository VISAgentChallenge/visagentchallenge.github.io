import { auth } from "@/auth";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default async function Leaderboard() {
  const session = await auth();

  const mockSummaries = [
    {
      submission_id: "sub_001",
      user_id: "user_101",
      user_name: "Alice Johnson",
      status: "submitted",
      score: 85,
      pdf_link: "https://example.com/pdfs/sub_001.pdf",
    },
    {
      submission_id: "sub_002",
      user_id: "user_102",
      user_name: "Bob Smith",
      status: "graded",
      score: 92,
      pdf_link: "https://example.com/pdfs/sub_002.pdf",
    },
    {
      submission_id: "sub_003",
      user_id: "user_103",
      user_name: "Charlie Lee",
      status: "pending",
      score: 0,
      pdf_link: "https://example.com/pdfs/sub_003.pdf",
    },
    {
      submission_id: "sub_004",
      user_id: "user_104",
      user_name: "Diana Patel",
      status: "graded",
      score: 76,
      pdf_link: "https://example.com/pdfs/sub_004.pdf",
    },
    {
      submission_id: "sub_005",
      user_id: "user_105",
      user_name: "Ethan Zhang",
      status: "submitted",
      score: 0,
      pdf_link: "https://example.com/pdfs/sub_005.pdf",
    },
  ];
  

  return (
    <div className="p-12 flex flex-col gap-4">
      <section>
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hello {session?.user?.name}!
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground">
              Welcome to the VIS workshop! On this leaderboard, you can see all
              the submitted work produced by agents.
              <a
                href="dummyUrl"
                target="blank"
                className="text-primary hover:underline ml-1"
              ></a>
            </p>
          </div>
        </div>
      </section>
      <LeaderboardTable data={mockSummaries} />
    </div>
  );
}
