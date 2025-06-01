import Image from "next/image";
import LeaderboardGallery from "@/components/LeaderboardGallery";

export default async function LandingPage() {
  return (
    <>
      {/* content section */}
      <div className="py-25 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-10">
          {/* workshop intro: workshop poster, headline, short intro */}
          <div className="relative z-10 flex justify-center h-full p-1">
            <h1 className="text-4xl font-bold text-black">AI Agents and the Future of VIS</h1>
          </div>
          <div className="relative w-full h-[400px] rounded-md overflow-hidden">
            <Image
              width={3364}
              height={1631}
              src="/challenge-background.png"
              alt="Challenge"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/0" />
          </div>
{/* 
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">The workshop</h2>
            <div className="space-y-4 my-3">
              <div>
                Recent advances in agents—autonomous, goal-driven AI systems that iteratively
                observe, act, and learn from their environments—offer a fundamentally different
                approach from traditional AI models that passively respond to input. These agentic
                AI systems are rapidly reshaping how we approach data-intensive tasks and providing
                new opportunities for the VIS community. 
                {/* Imagine an agent autonomously generating
                visualizations to analyze complex data, discovering patterns collaboratively,
                testing hypotheses, and communicating visual insights at a speed and scale beyond
                human capability. Yet, the emergence of these powerful systems raises critical
                questions that the VIS community must address: Could autonomous agents eventually
                replace human data scientists, and if not, how might they best collaborate? Are
                current visualization techniques and interfaces, originally designed for human
                analysts, suitable for agent interactions? How can VIS designers effectively
                integrate agents into their workflows without compromising human agency? And to what
                extent should agents help shape and educate the next generation of visualization
                researchers? 
              </div>

              <div>
                Through a mix of keynote talks, paper presentations, and a <span className="font-bold">mini-challenge</span>, this
                workshop invites researchers and practitioners to share innovative ideas, explore
                these questions, and discuss strategies to transform the impact of VIS for a future
                where human and AI agents co-exist.
              </div>
            </div>
          </div> 
          */}

          {/* Challenge overview */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">About the Challenge</h2>
            <ul className="space-y-4 my-3">
              <li>
                <div>
                  In parallel to soliciting the submission of relevant scientific works, the
                  workshop hosts a mini challenge on{" "}
                  <span className="font-bold">AI agents data visualization</span>. We invite
                  participants to build on the existing template by developing agents with improved
                  reasoning and coordination strategies. The objective is to generate more
                  insightful, coherent, and visually compelling analyses of the provided dataset, in
                  the form of a data visualization report.
                </div>
              </li>
              <li>
                <span className="font-bold">
                  Submitted papers do not need to be linked with the challenge.
                </span>
              </li>
              <li>

                <a href="/challenge" className="bg-blue-100 p-2 m-2 rounded-md text-xl">
                  {`🏅 More info & Get started with the challenge`}

                </a>
              </li>
            </ul>
          </div>
          {/* <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Important Dates</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>May 30th, 2025: Call for Participation</li>
              <li>Aug 20th, 2025: Paper Submission Deadline </li>
              <li>Sep 15th, 2025: Author Notification</li>
              <li>Oct 1st, 2025: Camera-Ready Deadline</li>
              <li>Nov 2nd or 3rd: Workshop Day, TBD</li>
            </ul>
          </div> */}

          {/* submission gallery  */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Leaderboard</h2>
            <span className="my-3">
              Finalized submissions from all participants are shown here. Feel free to have a look
              what others have created! Use the search bar below to find submissions by name.
            </span>
            <LeaderboardGallery />
          </div>
        </div>
      </div>
    </>
  );
}
