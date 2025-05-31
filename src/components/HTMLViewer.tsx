import { AlertCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";

interface HTMLViewerProps {
  htmlUrl: string;
}

type Status = "loading" | "error" | "success";

const HTMLViewer: React.FC<HTMLViewerProps> = ({ htmlUrl }) => {
  const [status, setStatus] = useState<Status>("loading");

  return (
    <div className="w-full h-full relative min-h-[400px]">
      {status === "loading" && (
        <div className="absolute inset-0 text-sm gap-2 flex items-center justify-center m-2 z-10 bg-gray-100 text-gray-500">
          <Loader2 className="animate-spin" />
          Loading HTML...
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 text-sm text-red-500 flex items-center justify-center bg-gray-100 gap-2 z-10">
          <AlertCircle className="size-5" />
          Failed to load HTML content
        </div>
      )}
      <iframe
        src={htmlUrl}
        title="HTML Viewer"
        className="w-full h-full border-none rounded bg-white"
        style={{ minHeight: 400 }}
        onLoad={() => setStatus("success")}
        onError={() => setStatus("error")}
      />
    </div>
  );
};

export default HTMLViewer;
