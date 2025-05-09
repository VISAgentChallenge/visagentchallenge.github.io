import Image from "next/image";
import { auth } from "../auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";
import TopNavBarWrapper from "@/components/TopNavBar/TopNavBarWrapper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import Footer from "@/components/Footer";

export default async function LandingPage() {
  // console.log("access after google login");
  // const session = await auth();
  // console.log("session", session);
  // if (session?.user) {
  //   redirect("/leaderboard");
  // }

  // return <SignIn />;

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
            <span className="text-muted-foreground">
              {`Dummy challenge description. This is a placeholder text for the challenge description. It will be replaced with the actual content later.`}
            </span>
          </div>

          {/* submission gallery  */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Leaderboard`}</h2>
            <span className="text-muted-foreground">
              {`Dummy challenge description. This is a placeholder text for the challenge description. It will be replaced with the actual content later.`}
            </span>
            <LeaderboardTable data={mockSummaries} />
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  );
}
