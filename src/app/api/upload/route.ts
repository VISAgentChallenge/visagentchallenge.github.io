import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || file.type !== "application/zip") {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  // const buffer = Buffer.from(await file.arrayBuffer());

  // update here with server endpoint
  //   const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  //   await mkdir(uploadDir, { recursive: true });

  //   const filePath = path.join(uploadDir, file.name);
  //   await writeFile(filePath, buffer);

  return NextResponse.json({ message: "File uploaded" });
}
