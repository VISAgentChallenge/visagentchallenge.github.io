import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ submission_id: string }> }
) {
  // Get the current user's session
  const session = await auth();
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { submission_id } = await params;

  // Construct the backend URL for the error log file
  const backendUrl = `${process.env.API_ENDPOINT}/file/${submission_id}/error.log`;

  try {
    // Fetch the error log from the backend
    const apiRes = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Handle errors
    if (!apiRes.ok) {
      const error = await apiRes.json();
      const errMessage = error.detail;
      return NextResponse.json({ error: errMessage }, { status: apiRes.status });
    }

    // Get the error log as text
    const logText = await apiRes.text();

    // Return the error log as plain text
    return new NextResponse(logText, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `inline; filename=error.log`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to fetch from server" }, { status: 500 });
  }
}