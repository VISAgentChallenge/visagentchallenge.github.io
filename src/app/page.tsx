import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import LeaderboardGallery from "@/components/LeaderboardGallery";

export default async function LandingPage() {
  // fetch all users' submissions
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
    <>
      {/* content section */}
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-10">
          {/* workshop intro: workshop poster, headline, short intro */}
          <div className="flex flex-row justify-left gap-12">
            <div className="w-[450px]">
              <AspectRatio ratio={1 / 1} className="border-2">
                {/* <Image src="..." alt="Image" className="rounded-md object-cover" /> */}
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <h1 className="text-5xl font-bold">{`AI Agents and the Future of VIS`}</h1>
              <ul className="list-disc list-inside space-y-2">
                <li>May 30th, 2025: Call for Participation</li>
                <li>Aug 30th, 2025: Paper Submission Deadline </li>
                <li>Sep 15th, 2025: Author Notification</li>
                <li>Oct 1st, 2025: Camera-Ready Deadline</li>
                <li>Nov 2nd or 3rd: Workshop Day, TBD</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`The workshop`}</h2>
            <div className="space-y-4 m-3">
              <div>
                Recent advances in agents—autonomous, goal-driven AI systems
                that iteratively observe, act, and learn from their
                environments—offer a fundamentally different approach from
                traditional AI models that passively respond to input. These
                agentic AI systems are rapidly reshaping how we approach
                data-intensive tasks and providing new opportunities for the VIS
                community. Imagine an agent autonomously generating
                visualizations to analyze complex data, discovering patterns
                collaboratively, testing hypotheses, and communicating visual
                insights at a speed and scale beyond human capability. Yet, the
                emergence of these powerful systems raises critical questions
                that the VIS community must address: Could autonomous agents
                eventually replace human data scientists, and if not, how might
                they best collaborate? Are current visualization techniques and
                interfaces, originally designed for human analysts, suitable for
                agent interactions? How can VIS designers effectively integrate
                agents into their workflows without compromising human agency?
                And to what extent should agents help shape and educate the next
                generation of visualization researchers?
              </div>

              <div>
                Through a mix of keynote talks, paper presentations, and a
                mini-challenge, this workshop invites researchers and
                practitioners to share innovative ideas, explore these
                questions, and discuss strategies to transform the impact of VIS
                for a future where human and AI agents co-exist.
              </div>
            </div>
          </div>

          {/* Challenge overview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`The Challenge`}</h2>
            <ul className="space-y-4 m-3">
              <li>
                <div>
                  In parallel to soliciting the submission of relevant
                  scientific works, the workshop hosts a mini challenge on{" "}
                  <span className="font-bold">
                    AI agents data visualization
                  </span>
                  . Participants are encouraged to build on the existing
                  template by developing agents with improved reasoning and
                  coordination strategies. The objective is to generate more
                  insightful, coherent, and visually compelling analyses of the
                  provided dataset, in the form of a one-page PDF report.
                </div>
              </li>
              <li>
                <span className="font-bold">
                  {`Submitted papers do not need to be linked with the challenge. `}
                </span>
              </li>
              <li>
                <a href="/challenge" className="bg-blue-100 p-1 rounded-md">
                  {`🏅 Get started with the challenge`}
                </a>
              </li>
            </ul>
          </div>

          {/* submission gallery  */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Leaderboard`}</h2>
            <span className="m-3">
              All finalized submissions are shown in the public leaderboard.
            </span>
            {/* <LeaderboardTable data={mockSummaries} /> */}
            <LeaderboardGallery />
          </div>
        </div>
      </div>
    </>
  );
}
