"use client";

import { credentialsSignInAction, googleSignInAction } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import googleSvg from "/public/google.svg";
import { useActionState, useEffect, useState } from "react";

export default function SignInPage() {
  const [formState, formAction] = useActionState(credentialsSignInAction, undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formState?.error) {
      setLoading(false);
    }
  }, [formState]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border p-6 shadow-md flex flex-col gap-6 justify-center items-center">
          <h1 className="font-bold text-3xl text-center flex flex-col gap-2">
            <div>Log into your account</div>
          </h1>

          {/* Google Sign-In */}
          <form action={googleSignInAction}>
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
          <form action={formAction} onSubmit={() => setLoading(true)}>
            <div className="flex flex-col gap-2">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="border rounded px-2 py-1"
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="border rounded px-2 py-1"
              />
              <Button type="submit" disabled={loading} className="rounded">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in
                  </>
                ) : (
                  <>
                    <Mail />
                    Sign in with Email
                  </>
                )}
              </Button>
            </div>
          </form>
          {formState?.error && (
            <div className="bg-red-100 px-4 py-2 rounded-sm text-red-500 text-sm mt-2">
              {formState.error}
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
