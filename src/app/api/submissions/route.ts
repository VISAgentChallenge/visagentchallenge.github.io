import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  // Get the current user's session
  const session = await auth();
  console.log(session);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch submissions from the backend
  const apiRes = await fetch(`${process.env.API_ENDPOINT}/list/submissions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await apiRes.json();
  console.log(data);
  return NextResponse.json(data, { status: apiRes.status });
}
