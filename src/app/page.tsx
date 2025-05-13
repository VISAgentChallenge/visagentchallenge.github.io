import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default async function LandingPage() {
  // fetch all users' submissions
  const mockSummaries = [
    {
      submission_id: 'sub_001',
      user_id: 'user_101',
      user_name: 'Alice Johnson',
      status: 'approved',
      metrics: {
        total_time: 1250, // 20.8 mins
      },
      score: 91.5,
      pdf_link: '/uploads/sub_001.pdf',
    },
    {
      submission_id: 'sub_002',
      user_id: 'user_102',
      user_name: 'Bob Smith',
      status: 'rejected',
      metrics: {
        total_time: 890, // ~15 mins
      },
      score: 58.3,
      pdf_link: '/uploads/sub_002.pdf',
    },
    {
      submission_id: 'sub_003',
      user_id: 'user_103',
      user_name: 'Charlie Nguyen',
      status: 'pending',
      metrics: {
        total_time: 1600, // ~26.6 mins
      },
      score: 76.9,
      pdf_link: '/uploads/sub_003.pdf',
    },
    {
      submission_id: 'sub_004',
      user_id: 'user_104',
      user_name: 'Diana Patel',
      status: 'approved',
      metrics: {
        total_time: 2105, // ~35 mins
      },
      score: 95.0,
      pdf_link: '/uploads/sub_004.pdf',
    },
    {
      submission_id: 'sub_005',
      user_id: 'user_105',
      user_name: 'Ethan Lee',
      status: 'pending',
      metrics: {
        total_time: 780, // 13 mins
      },
      score: 69.2,
      pdf_link: '/uploads/sub_005.pdf',
    },
  ];
  

  return (
    <>
      {/* content section */}
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-24">
          {/* workshop intro: workshop poster, headline, short intro */}
          <div className="flex flex-row justify-left gap-12">
            <div className="w-[450px]">
              <AspectRatio ratio={1 / 1} className="border-2">
                {/* <Image src="..." alt="Image" className="rounded-md object-cover" /> */}
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <h1 className="text-5xl font-bold">{`VIS Workshop`}</h1>
              <span className="text-muted-foreground">
                {`Dummy workshop description. This is a placeholder text for the workshop description. It will be replaced with the actual content later.`}
              </span>
            </div>
          </div>

          {/* Challenge overview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Challenge Overview`}</h2>
            <ul className="space-y-4">
              <li>
                <span className="text-muted-foreground">
                  {`I. In parallel to soliciting the submission of relevant scientific works, the workshop 
                hosts a mini challenge on AI agents data visualization. Participants are encouraged to 
                build on the existing template by developing agents with improved reasoning and coordination 
                strategies. The objective is to generate more insightful, coherent, and visually compelling 
                analyses of the provided dataset, in the form of a one-page PDF report.`}
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  {`II. Submitted papers do not need to be linked with the challenge. `}
                </span>
              </li>
            </ul>
          </div>

          {/* submission gallery  */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Leaderboard`}</h2>
            <span className="text-muted-foreground">
              {`Dummy leaderboard description. This is a placeholder text for the challenge description. It will be replaced with the actual content later.`}
            </span>
            <LeaderboardTable data={mockSummaries} />
          </div>
        </div>
      </div>
    </>
  );
}
