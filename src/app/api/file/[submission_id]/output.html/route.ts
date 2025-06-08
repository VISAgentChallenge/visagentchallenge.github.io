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

  // Construct the backend URL for the HTML file
  const backendUrl = `${process.env.API_ENDPOINT}/file/${submission_id}/output.html`;

  try {
    // Fetch the HTML file from the backend
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

    // Get the HTML file as a buffer
    const pdfBuffer = await apiRes.arrayBuffer();

    // Return the HTML file with appropriate headers
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename=output.html`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to fetch from server" }, { status: 500 });
  }
}
