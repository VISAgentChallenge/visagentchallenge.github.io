import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Get the current user's session
  const session = await auth();
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the submission ID from the request body
  const searchParams = req.nextUrl.searchParams;
  const submission_id = searchParams.get("submission_id");
  if (!submission_id) {
    return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
  }

  // Construct the backend URL for the error log file
  const backendUrl = `${process.env.API_ENDPOINT}/finalize/submission?submission_id=${submission_id}`;

  try {
    // Fetch the error log from the backend
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Handle errors
    if (!res.ok) {
      const error = await res.json();
      const errMessage = error.detail;
      return NextResponse.json({ error: errMessage }, { status: res.status });
    }
    return NextResponse.json({ message: "Submission marked as final" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to fetch from server" }, { status: 500 });
  }
}
