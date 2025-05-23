// PdfViewer.tsx
import React, { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { VariableSizeList as List } from "react-window";
import { asyncMap } from "@wojtekmaj/async-array-utils";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { PDF_VIEWER_PADDING_HEIGHT, PDF_VIEWER_PADDING_WIDTH } from "@/lib/consts";
import { CircleAlert } from "lucide-react";
import { Loader2 } from "lucide-react";

// Set up the PDF.js worker using the legacy build.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = {
  pdfUrl: string;
};

type PageViewport = {
  width: number;
  height: number;
};

type RowProps = {
  index: number;
  style: React.CSSProperties;
  className: string;
  containerWidth: number;
};

const Row: React.FC<RowProps> = ({ index, style, className, containerWidth }) => {
  return (
    <div className={className} style={style}>
      <Page pageIndex={index} width={containerWidth} />
    </div>
  );
};

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<List>(null);

  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [pageViewports, setPageViewports] = useState<PageViewport[] | null>(null);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const LoadingComponent = () => (
    <div className="flex flex-col gap-1 justify-center items-center text-xs h-full bg-gray-100 text-gray-500">
      <Loader2 className="animate-spin" />
      Loading PDF
    </div>
  );

  const ErrorComponent = () => (
    <div className="flex flex-col gap-1 text-xs justify-center items-center h-20 bg-gray-100 text-red-500">
      <CircleAlert className="mr-2" />
      Failed to load PDF
    </div>
  );

  // Measure container width and update page height (assume ratio 1.5)
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        const width = containerRef.current?.clientWidth || 0;
        const height = containerRef.current?.clientHeight || 0;
        setContainerWidth(width - PDF_VIEWER_PADDING_WIDTH);
        setContainerHeight(height - PDF_VIEWER_PADDING_HEIGHT);
      };

      updateDimensions();

      const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  // When the PDF is loaded, pre-calculate each page's viewport (dimensions) at scale 1.
  useEffect(() => {
    setPageViewports(null);
    if (!pdf) return;

    (async () => {
      const pageNumbers = Array.from(new Array(pdf.numPages)).map((_, index) => index + 1);
      const nextPageViewports: PageViewport[] = await asyncMap(pageNumbers, async (pageNumber) => {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        return { width: viewport.width, height: viewport.height };
      });
      setPageViewports(nextPageViewports);
    })();
  }, [pdf]);

  // Callback when the PDF document has loaded.
  function onDocumentLoadSuccess(nextPdf: pdfjs.PDFDocumentProxy) {
    setPdf(nextPdf);
  }

  // Calculate the height for a given page (scaled to our fixed width).
  function getPageHeight(pageIndex: number): number {
    if (!pageViewports) {
      throw new Error("getPageHeight() called too early");
    }
    const pageViewport = pageViewports[pageIndex];
    const scale = containerWidth / pageViewport.width;
    return pageViewport.height * scale;
  }

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-full border border-gray-200 shadow-sm bg-gray-100"
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<LoadingComponent />}
        error={<ErrorComponent />}
      >
        {pdf && pageViewports ? (
          <List
            ref={listRef}
            width={containerWidth}
            height={containerHeight}
            estimatedItemSize={containerHeight}
            itemCount={pdf.numPages}
            itemSize={getPageHeight}
          >
            {({ index, style }) => {
              const className = "relative border-y-4 border-gray-100";
              return (
                <Row
                  index={index}
                  style={style}
                  className={className}
                  containerWidth={containerWidth}
                />
              );
            }}
          </List>
        ) : null}
      </Document>
    </div>
  );
};

export default PdfViewer;
