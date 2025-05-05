import Image from "next/image";
import { auth } from "../auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function RootPage() {
  console.log("access after google login");
  const session = await auth();
  console.log("session", session);
  if (session?.user) {
    redirect("/leaderboard");
  }

  return <SignIn />;
}
