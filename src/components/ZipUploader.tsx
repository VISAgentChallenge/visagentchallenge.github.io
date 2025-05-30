"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileText, Loader2, Upload, X } from "lucide-react";

export function ZipUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setIsUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      toast.success("File uploaded successfully");
      setFile(null);
    } catch (error) {
      toast.error("File upload failed", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    e.target.value = "";
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow-none">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="zip-upload" className="font-bold text-lg">
            Upload ZIP File
          </Label>
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
            } ${file ? "" : "hover:bg-gray-50"}`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Input
              id="zip-upload"
              type="file"
              accept=".zip"
              ref={inputRef}
              onChange={handleInputChange}
              className="hidden"
              placeholder="Choose a ZIP file"
            />
            {file ? (
              <span className="flex gap-2 items-center text-blue-500 bg-blue-50 px-2 py-1 rounded-md font-medium">
                <FileText />
                {file.name}
                <X
                  className="p-1 w-5 h-5 cursor-pointer hover:bg-blue-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                />
              </span>
            ) : (
              <span className="text-gray-500">Drag & drop a ZIP file here, or click to select</span>
            )}
          </div>
          <Button type="submit" className="w-fit self-center" disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
