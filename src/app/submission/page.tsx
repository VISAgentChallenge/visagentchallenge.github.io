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
import { AlertCircle, Check, FileSymlink, FileText, Loader2, Trash2 } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Submission, SubmissionList } from "@/lib/types";
import { toast } from "sonner";
import HTMLViewer from "@/components/HTMLViewer";
import { formatDateTime } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import FinalizedSubmissionLinks from "@/components/FinalizedSubmissionLinks";
import Teammates from "@/components/Teammates";

export default function Submission() {
  const [finalSubmissionId, setFinalSubmissionId] = useState<string>();
  const [isMarkingAsFinal, setIsMarkingAsFinal] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showSubmissionSheet, setShowSubmissionSheet] = useState(false);
  const [showErrorSheet, setShowErrorSheet] = useState(false);

  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchSubmissions = async () => {
  //     setLoading(true);
  //     setError("");

  //     try {
  //       const res = await fetch("/api/submissions");

  //       if (!res.ok) {
  //         const data = await res.json();
  //         throw new Error(data.error);
  //       }

  //       const data = (await res.json()) as SubmissionList;
  //       setSubmissions(data.submissions || []);
  //       setFinalSubmissionId(
  //         data.submissions.find((s: Submission) => s.isFinal)?.id
  //       );
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Unknown error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSubmissions();
  // }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/submissions");

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      const data = (await res.json()) as SubmissionList;
      setSubmissions(data.submissions || []);
      setFinalSubmissionId(data.submissions.find((s: Submission) => s.isFinal)?.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`wss://52.250.67.65:8000/ws/submissions`);

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("📨 WebSocket message:", event.data);
      if (event.data === "update") {
        fetchSubmissions();
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleOpenPDF = (submissionId: string) => {
    setViewerUrl(`/api/file/${submissionId}/output.pdf`);
    setShowSubmissionSheet(true);
  };

  const handleOpenHTML = (submissionId: string) => {
    setViewerUrl(`/api/file/${submissionId}/output.html`);
    setShowSubmissionSheet(true);
  };

  const handleOpenErrorLog = async (submissionId: string) => {
    setErrorLog(null);
    setShowErrorSheet(true);

    try {
      const res = await fetch(`/api/file/${submissionId}/error.log`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      const log = await res.text();
      setErrorLog(log);
    } catch (err) {
      setErrorLog(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  const handleMarkAsFinal = async (submissionId: string) => {
    setIsMarkingAsFinal(true);

    try {
      const res = await fetch(`/api/finalize?submission_id=${submissionId}`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      toast.success("Submission marked as final");
      setIsMarkingAsFinal(false);
      setFinalSubmissionId(submissionId);
    } catch (err) {
      setIsMarkingAsFinal(false);
      toast.error("Failed to mark as final", {
        description: err instanceof Error ? err.message : "An unexpected error occurred",
      });
    }
  };

  const handleDeleteSubmission = async (submissionId: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/delete?submission_id=${submissionId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      toast.success("Submission deleted successfully");
      setSubmissions((prev) => prev.filter((submission) => submission.id !== submissionId));
      if (finalSubmissionId === submissionId) {
        setFinalSubmissionId(undefined);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-12">
          {/* individual leaderboard */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Your submissions</h2>
            <span>
              The below leaderboard shows your submissions. Click on the submission ID to view the
              PDF/HTML output. Please select one submission in&nbsp;
              <span className="bg-green-100 p-1 rounded">SUCCESS</span>
              &nbsp;status as the final submission to display on the public leaderboard, and you can
              update it anytime. Please <u>refresh the page</u> if there's a delay in the
              leaderboard updating.
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
                      <TableHead className="px-4 bg-gray-100">Submitted on</TableHead>
                      <TableHead className="text-center bg-gray-100">Status</TableHead>
                      <TableHead className="text-center bg-gray-100">Time (s)</TableHead>
                      <TableHead className="text-center bg-gray-100">View</TableHead>
                      <TableHead className="text-center bg-gray-100 w-10"></TableHead>
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
                      submissions.map((submission) => (
                        <TableRow key={submission.id} className="group w-10">
                          <TableCell className="pl-4">
                            <div className="flex gap-2 w-[180px]">
                              {formatDateTime(submission.created_at)}
                              {finalSubmissionId !== submission.id && (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkAsFinal(submission.id);
                                  }}
                                  className="cursor-pointer group-hover:opacity-100 opacity-0 hover:bg-neutral-200 transition-opacity duration-300 flex gap-2 items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-500"
                                >
                                  {isMarkingAsFinal ? (
                                    <Loader2 className="size-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Check className="size-4" />
                                      Mark as Final
                                    </>
                                  )}
                                </span>
                              )}
                              {finalSubmissionId === submission.id && (
                                <span className="flex gap-2 items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                  <Check className="size-4" />
                                  Finalized
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <StatusBadge status={submission.status} />
                          </TableCell>
                          <TableCell className="text-center">
                            {submission.metrics?.total_time
                              ? Number(submission.metrics.total_time).toFixed(2)
                              : "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            {submission.status === "SUCCESS" ? (
                              submission.output === "pdf" ? (
                                <Button
                                  variant="link"
                                  className="cursor-pointer"
                                  onClick={() => handleOpenPDF(submission.id)}
                                >
                                  <FileText />
                                  PDF
                                </Button>
                              ) : (
                                <Button
                                  variant="link"
                                  className="cursor-pointer"
                                  onClick={() => handleOpenHTML(submission.id)}
                                >
                                  <FileSymlink />
                                  HTML
                                </Button>
                              )
                            ) : submission.status === "FAILED" ? (
                              <Button
                                variant="link"
                                className="cursor-pointer text-red-600"
                                onClick={() => handleOpenErrorLog(submission.id)}
                              >
                                <AlertCircle />
                                Logs
                              </Button>
                            ) : (
                              <Button variant="link" className="cursor-not-allowed" disabled>
                                <FileText />
                                Unavailable
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="text-right w-10">
                            {(submission.status === "SUCCESS" ||
                              submission.status === "FAILED") && (
                              <Button
                                variant="link"
                                className="text-red-500 hover:bg-red-100 transition-none rounded-sm invisible group-hover:visible cursor-pointer"
                                onClick={() => {
                                  setSubmissionToDelete(submission.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="size-4" />
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

          {/* finalized submission links */}
          {submissions.length > 0 && (
            <FinalizedSubmissionLinks finalSubmissionId={finalSubmissionId} />
          )}

          {/* submit portal */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Submit Here</h2>
            <span>
              You can submit a new task here. The submission will be automatically graded and the
              results will be shown in the leaderboard above.
            </span>
            <ZipUploader />
          </div>

          {/* teammates */}
          <Teammates />
        </div>
      </div>

      {/* PDF Viewer Sheet */}
      <Sheet open={showSubmissionSheet} onOpenChange={setShowSubmissionSheet}>
        <SheetContent
          side="right"
          className="h-full min-w-[50vw] max-w-3xl flex flex-col border-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>Submission Viewer</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 border-t border-gray-200">
            {viewerUrl && viewerUrl.endsWith(".pdf") && <PDFViewer pdfUrl={viewerUrl} />}
            {viewerUrl && viewerUrl.endsWith(".html") && <HTMLViewer htmlUrl={viewerUrl} />}
          </div>
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
            <SheetTitle>Submission Logs</SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-0 overflow-auto bg-black text-white p-4 rounded mx-4 mb-4">
            {errorLog === null ? (
              <div className="flex gap-2">
                <Loader2 className="animate-spin" />
                <pre>Loading logs</pre>
              </div>
            ) : (
              <pre>{errorLog}</pre>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document.body.style.pointerEvents = ""; // Resolves a known issue with Dialog
          }}
        >
          <DialogHeader>
            <DialogTitle>Delete Submission</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this submission? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={async () => {
                if (submissionToDelete) {
                  await handleDeleteSubmission(submissionToDelete);
                  setDeleteDialogOpen(false);
                  setSubmissionToDelete(null);
                }
              }}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Deleting
                </>
              ) : (
                <>
                  <Trash2 className="size-4 mr-1" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
