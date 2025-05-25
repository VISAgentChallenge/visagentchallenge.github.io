"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { credentialsSignUpAction } from "@/actions/authActions";
import { Loader2, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [formState, formAction] = useActionState(credentialsSignUpAction, undefined);

  useEffect(() => {
    if (formState?.error) {
      setLoading(false);
    }
  }, [formState]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-6 shadow-md flex flex-col gap-6 justify-center items-center">
        <h1 className="font-bold text-3xl text-center">Create an account</h1>
        <form
          action={formAction}
          onSubmit={() => setLoading(true)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex gap-2">
            <Input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="rounded"
              required
            />
            <Input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="rounded"
              required
            />
          </div>
          <Input name="email" type="email" placeholder="Email" className="rounded" required />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="rounded"
            required
          />
          <Button type="submit" disabled={loading} className="rounded">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Signing up
              </>
            ) : (
              <>
                <UserPlus /> Sign Up
              </>
            )}
          </Button>

          {formState?.error && (
            <div className="bg-red-100 px-4 py-2 rounded-sm text-red-500 text-sm mt-2">
              {formState.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
