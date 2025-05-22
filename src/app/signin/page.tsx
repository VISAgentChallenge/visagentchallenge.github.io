import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  // User is already signed in, redirect to the home page
  if (session?.user) {
    redirect("/");
  }

  return (
    <>
      <SignIn />
    </>
  );
}
