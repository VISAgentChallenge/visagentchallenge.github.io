import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  // Get the current user's session
  const session = await auth();
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || file.type !== "application/zip") {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  // Prepare the form data to send to the backend
  const backendFormData = new FormData();
  backendFormData.append("file", file, file.name);

  try {
    // Forward the file to the FastAPI backend
    const apiRes = await fetch(`${process.env.API_ENDPOINT}/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: backendFormData,
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
    return NextResponse.json({ error: "Unable to fetch from server" }, { status: 500 });
  }
}
