import Image from "next/image";
import { signIn } from "@/auth";
import googleSvg from "/public/google.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";

export default function SignIn() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border p-6 shadow-md flex flex-col gap-6 justify-center items-center">
          <h1 className="font-bold text-3xl text-center flex flex-col gap-2">
            <div>Log into your account</div>
          </h1>

          {/* Google Sign-In */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <Button type="submit">
              <Image src={googleSvg} alt="Google" width={16} height={16} />
              Sign in with Google
            </Button>
          </form>

          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Separator className="max-w-1/4" />
            <p className="text-sm text-muted-foreground">or</p>
            <Separator className="max-w-1/4" />
          </div>

          {/* Credentials Sign-In */}
          <form
            action={async (formData: FormData) => {
              "use server";
              const email = formData.get("email");
              const password = formData.get("password");
              if (typeof email === "string" && typeof password === "string") {
                await signIn("credentials", { email, password, redirectTo: "/" });
              }
            }}
          >
            <div className="flex flex-col gap-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="border rounded px-2 py-1"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="border rounded px-2 py-1"
              />
              <Button type="submit">
                <Mail /> Sign in with Email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
