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

  // Forward the file to the FastAPI backend
  const apiRes = await fetch(`${process.env.API_ENDPOINT}/submit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: backendFormData,
  });

  const contentType = apiRes.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await apiRes.json();
  } else {
    data = { message: await apiRes.text() };
  }

  return NextResponse.json(data, { status: apiRes.status });
}
