"use server";
import { signOut } from "@/auth";

export async function logout() {
  try {
    console.log("Logging out...");
    await signOut({ redirectTo: "/" });
  } catch (error) {
    return error;
  }
}
