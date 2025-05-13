"use client";

import { LeaderboardTable } from "@/components/LeaderboardTable";
import { ZipUploader } from "@/components/ZipUploader";

export default function Home() {
  //fetch user submissions from the server
  const mockSummaries = [
    {
      submission_id: "sub_001",
      user_id: "user_101",
      user_name: "Alice Johnson",
      status: "approved",
      metrics: {
        total_time: 1250, // 20.8 mins
      },
      score: 91.5,
      pdf_link: "/uploads/sub_001.pdf",
    },
    {
      submission_id: "sub_002",
      user_id: "user_102",
      user_name: "Bob Smith",
      status: "rejected",
      metrics: {
        total_time: 890, // ~15 mins
      },
      score: 58.3,
      pdf_link: "/uploads/sub_002.pdf",
    },
    {
      submission_id: "sub_003",
      user_id: "user_103",
      user_name: "Charlie Nguyen",
      status: "pending",
      metrics: {
        total_time: 1600, // ~26.6 mins
      },
      score: 76.9,
      pdf_link: "/uploads/sub_003.pdf",
    },
    {
      submission_id: "sub_004",
      user_id: "user_104",
      user_name: "Diana Patel",
      status: "approved",
      metrics: {
        total_time: 2105, // ~35 mins
      },
      score: 95.0,
      pdf_link: "/uploads/sub_004.pdf",
    },
    {
      submission_id: "sub_005",
      user_id: "user_105",
      user_name: "Ethan Lee",
      status: "pending",
      metrics: {
        total_time: 780, // 13 mins
      },
      score: 69.2,
      pdf_link: "/uploads/sub_005.pdf",
    },
  ];

  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-24">
          {/* individual leaderboard */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Your submissions`}</h2>
            <span className="text-muted-foreground">
              {`The below leaderboard shows your submissions. Click on the submission ID to view the PDF.`}
            </span>
            {/* user fetched data here */}
            <LeaderboardTable data={mockSummaries} />
          </div>

          {/* submit portal */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Submit Here`}</h2>
            <span className="text-muted-foreground">
              {`You can submit a new task here. The submission will be automatically graded and the results will be shown in the leaderboard above.`}
            </span>
            {/* post task to the server -> app/api/upload */}
            <ZipUploader />
          </div>
        </div>
      </div>
    </div>
  );
}
