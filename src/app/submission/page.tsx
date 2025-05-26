"use client";

import { useEffect, useState } from "react";
import { ZipUploader } from "@/components/ZipUploader";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function Submission() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSheet, setShowSheet] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [showErrorSheet, setShowErrorSheet] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/submissions");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch submissions");
        }
        const data = await res.json();
        setSubmissions(data.submissions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleOpenPDF = (submissionId: string) => {
    setPdfUrl(`/api/output/${submissionId}/output.pdf`);
    setShowSheet(true);
  };

  const handleOpenErrorLog = async (submissionId: string) => {
    setErrorLog(null);
    setShowErrorSheet(true);
    try {
      const res = await fetch(`/api/output/${submissionId}/error.log`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch error log");
      }
      const log = await res.text();
      setErrorLog(log);
    } catch (err) {
      setErrorLog(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-24">
          {/* individual leaderboard */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Your submissions</h2>
            <span className="text-muted-foreground">
              The below leaderboard shows your submissions. Click on the submission ID to view the
              PDF.
            </span>
            {loading ? (
              <div className="flex justify-center items-center gap-2 w-full h-50 text-gray-500 bg-gray-100 rounded-md p-4 text-sm">
                <Loader2 className="size-5 animate-spin" />
                Loading
              </div>
            ) : error ? (
              <div className="flex justify-center items-center gap-2 w-full h-50 text-red-500 bg-gray-100 rounded-md p-4 text-sm">
                <AlertCircle />
                {error}
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-sm">
                <Table className="border-collapse">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="px-4 bg-gray-100">Submitted At</TableHead>
                      <TableHead className="text-center bg-gray-100">Status</TableHead>
                      <TableHead className="text-center bg-gray-100">View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                          <span className="flex flex-col justify-center items-center gap-2">
                            <AlertCircle />
                            No submissions present. Upload a zip file to get started.
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : (
                      submissions.map((submission: any) => (
                        <TableRow key={submission.id}>
                          <TableCell className="px-4">
                            {formatDateTime(submission.created_at)}
                          </TableCell>
                          <TableCell className="text-center">
                            <StatusBadge status={submission.status} />
                          </TableCell>
                          <TableCell className="text-center">
                            {submission.status === "SUCCESS" ? (
                              <Button
                                variant="link"
                                className="cursor-pointer"
                                onClick={() => handleOpenPDF(submission.id)}
                              >
                                <FileText />
                                PDF
                              </Button>
                            ) : submission.status === "FAILED" ? (
                              <Button
                                variant="link"
                                className="cursor-pointer text-red-600"
                                onClick={() => handleOpenErrorLog(submission.id)}
                              >
                                <AlertCircle />
                                Error Log
                              </Button>
                            ) : (
                              <Button variant="link" className="cursor-not-allowed" disabled>
                                <FileText />
                                Unavailable
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* PDF Viewer Sheet */}
          <Sheet open={showSheet} onOpenChange={setShowSheet}>
            <SheetContent
              side="right"
              className="h-full min-w-[50vw] max-w-3xl flex flex-col"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <SheetHeader>
                <SheetTitle>PDF Viewer</SheetTitle>
              </SheetHeader>
              <div className="flex-1 min-h-0">{pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}</div>
            </SheetContent>
          </Sheet>

          {/* Error Log Sheet */}
          <Sheet open={showErrorSheet} onOpenChange={setShowErrorSheet}>
            <SheetContent
              side="right"
              className="h-full min-w-[50vw] max-w-2xl flex flex-col"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <SheetHeader>
                <SheetTitle>Error Log</SheetTitle>
              </SheetHeader>
              <div className="flex-1 min-h-0 overflow-auto bg-black text-white p-4 rounded mx-4 mb-4">
                {errorLog === null ? "Loading..." : <pre>{errorLog}</pre>}
              </div>
            </SheetContent>
          </Sheet>

          {/* submit portal */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Submit Here</h2>
            <span className="text-muted-foreground">
              You can submit a new task here. The submission will be automatically graded and the
              results will be shown in the leaderboard above.
            </span>
            <ZipUploader />
          </div>
        </div>
      </div>
    </div>
  );
}
