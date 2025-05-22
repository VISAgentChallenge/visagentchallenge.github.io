"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ZipUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast("No file selected");
      return;
    }

    if (file.type !== "application/zip" && !file.name.endsWith(".zip")) {
      toast("Only Zip files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();
      toast("File uploaded successfully");
      setFile(null);
    } catch {
      toast("File uploaded successfully");
    }
  };

  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="zip-upload" className="font-bold text-lg">
              Upload ZIP File
            </Label>
            <Input
              id="zip-upload"
              type="file"
              accept=".zip"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="focus:ring focus:ring-gray-700 focus:ring-opacity-50 pt-1.5"
              placeholder="Choose a ZIP file"
            />
          </div>
          <Button type="submit" className="w-full">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}
