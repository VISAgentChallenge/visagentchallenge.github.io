import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";
export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    // User is already signed in, redirect to the home page
    // to avoid accessing the sign-in page
    redirect("/");
  }
  return (
    <>
      <SignIn />
    </>
  );
}
