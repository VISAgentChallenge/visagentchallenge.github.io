"use server";

import { signIn } from "@/auth";

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function credentialsSignInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email === "string" && typeof password === "string") {
    await signIn("credentials", { email, password, redirectTo: "/" });
  }
}
