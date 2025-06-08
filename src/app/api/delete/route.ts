import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  // Get the current user's session
  const session = await auth();
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the submission ID from the request query string
  const searchParams = req.nextUrl.searchParams;
  const submission_id = searchParams.get("submission_id");

  if (!submission_id) {
    return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
  }

  // Construct the backend URL
  const backendUrl = `${process.env.API_ENDPOINT}/delete/submission?submission_id=${submission_id}`;

  try {
    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Handle errors
    if (!res.ok) {
      const error = await res.json();
      const errMessage = error.detail || "Failed to delete submission";
      return NextResponse.json({ error: errMessage }, { status: res.status });
    }

    return NextResponse.json({ message: "Submission deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to delete submission" }, { status: 500 });
  }
}
