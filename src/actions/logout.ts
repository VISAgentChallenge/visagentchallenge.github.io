"use server";

import { signOut } from "@/auth";

export async function logout() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    return error;
  }
}
