"use client";
import { CircleAlert, Loader2 } from "lucide-react";
import { Document, pdfjs, Thumbnail } from "react-pdf";

// set worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFThumbnailProps {
  pdfUrl: string;
  className?: string;
}

const PDFThumbnail = ({ pdfUrl, className = "h-40 overflow-hidden" }: PDFThumbnailProps) => {
  const Loading = () => (
    <div className="flex flex-col justify-center items-center text-xs h-full bg-gray-100 text-gray-500">
      <Loader2 className="animate-spin" />
      Loading thumbnail
    </div>
  );

  const Error = () => (
    <div className="flex flex-col text-xs justify-center items-center h-20 bg-gray-100 text-red-500">
      <CircleAlert className="mr-2" />
      Failed to load thumbnail
    </div>
  );

  return (
    <div className={className}>
      <Document file={pdfUrl} loading={<Loading />} error={<Error />}>
        <Thumbnail pageNumber={1} width={200} onItemClick={() => {}} />
      </Document>
    </div>
  );
};

export default PDFThumbnail;
