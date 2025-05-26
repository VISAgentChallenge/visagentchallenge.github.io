import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  // Get the current user's session
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch submissions from the backend
    const apiRes = await fetch(`${process.env.API_ENDPOINT}/list/submissions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Handle errors
    if (!apiRes.ok) {
      const error = await apiRes.json();
      const errMessage = error.detail;
      return NextResponse.json({ error: errMessage }, { status: apiRes.status });
    }

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch {
    return NextResponse.json({ error: "Disconnected from server" }, { status: 500 });
  }
}
