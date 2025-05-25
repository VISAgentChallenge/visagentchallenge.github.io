"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function credentialsSignInAction(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email === "string" && typeof password === "string") {
    try {
      await signIn("credentials", { email, password, redirect: false });
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === "CredentialsSignin") {
          return { error: "Either email or password is incorrect." };
        }
        return {
          error: `Failed to sign in: ${e.message}. Visit https://authjs.dev/reference/core/errors for more information on this specific error.`,
        };
      }
    }
    redirect("/");
  } else {
    return { error: "All fields are required." };
  }
}

export async function credentialsSignUpAction(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof firstName === "string" &&
    typeof lastName === "string" &&
    typeof email === "string" &&
    typeof password === "string"
  ) {
    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/create/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
      }

      await signIn("credentials", { email, password, redirect: false });
    } catch (e) {
      return {
        error: `Failed to create user: ${e instanceof Error ? e.message : "Unknown error"}`,
      };
    }
    redirect("/");
  } else {
    return { error: "All fields are required." };
  }
}
