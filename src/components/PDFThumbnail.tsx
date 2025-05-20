"use client";
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

const PDFThumbnail = ({
  pdfUrl,
  className = "h-40 overflow-hidden",
}: PDFThumbnailProps) => {
  return (
    <div className={className}>
      <Document file={pdfUrl}>
        <Thumbnail pageNumber={1} width={200} />
      </Document>
    </div>
  );
};

export default PDFThumbnail;
