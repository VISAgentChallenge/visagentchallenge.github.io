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
        {/* <Page pageIndex={1} height={200} />
         */}
        <Thumbnail pageNumber={1} width={200} />
      </Document>
    </div>
  );
};

export default PDFThumbnail;

// "use client";

// import { useState, useEffect } from "react";
// import { Document, Page } from "react-pdf";

// interface PDFThumbnailProps {
//   pdfUrl: string;
//   width?: number;
//   className?: string;
// }

// const PDFThumbnail = ({
//   pdfUrl,
//   width = 200,
//   className = "",
// }: PDFThumbnailProps) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     // Only load pdfjs on the client side
//     import("react-pdf").then(({ pdfjs }) => {
//       pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
//     });
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     // Return a placeholder while loading
//     return (
//       <div
//         className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}
//         style={{ width: width, height: width * 1.4 }}
//       >
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className={className}>
//       <Document file={pdfUrl}>
//         <Page pageNumber={1} width={width} />
//       </Document>
//     </div>
//   );
// };

// export default PDFThumbnail;
