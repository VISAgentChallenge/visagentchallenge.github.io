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

  // Construct the backend URL for the PDF file
  const backendUrl = `${process.env.API_ENDPOINT}/output/${submission_id}/output.pdf`;

  try {
    // Fetch the PDF from the backend
    const apiRes = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/pdf",
      },
    });

    // Handle errors
    if (!apiRes.ok) {
      const error = await apiRes.json();
      const errMessage = error.detail;
      return NextResponse.json({ error: errMessage }, { status: apiRes.status });
    }

    // Get the PDF as a buffer
    const pdfBuffer = await apiRes.arrayBuffer();

    // Return the PDF with appropriate headers
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=output.pdf`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Disconnected from server" }, { status: 500 });
  }
}
