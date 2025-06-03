"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PDFThumbnail from "./PDFThumbnail";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CircleAlert } from "lucide-react";
import PdfViewer from "./PDFViewer";
import { formatDateTime } from "@/lib/utils";
import { Submission } from "@/lib/types";
import HTMLViewer from "./HTMLViewer";
export default function LeaderboardGallery() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string>();
  // Uncomment the following line if you need to use a hosted URL
  // const hostedURL =
  //   process.env.NEXT_PUBLIC_URL ||
  //   "https://purple-glacier-014f19d1e.6.azurestaticapps.net";

  // useEffect(() => {
  //   const fetchSubmissions = async () => {
  //     try {
  //       const res = await fetch("api/leaderboard", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!res.ok) {
  //         const data = await res.json();
  //         setError(data.error || "An unexpected error occurred");
  //       }

  //       const data = await res.json();
  //       setSubmissions(data.submissions);
  //       setError("");
  //     } catch {
  //       setError("Unable to fetch from server");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSubmissions();
  // }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("api/leaderboard", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "An unexpected error occurred");
      }
      const data = await res.json();
      setSubmissions(data.submissions);
      setError("");
    } catch {
      setError("Unable to fetch from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    // use ws for local development
    // const socket = new WebSocket(`ws://localhost:8000/ws/submissions`);
    //use wss for production
    const socket = new WebSocket(
      `wss://http://52.250.67.65:8000/ws/leaderboard`
    );

    socket.onmessage = (event) => {
      if (event.data === "update") {
        fetchSubmissions(); // Refresh data on update signal
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket closed");
    };

    return () => socket.close();
  }, []);

  const filteredSubmissions = submissions.filter((s) => {
    const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  // comment out in case we need this in the future
  // const handleCopyUrl = (submissionId: string) => {
  //   navigator.clipboard
  //     .writeText(`${hostedURL}/api/output/${submissionId}`)
  //     .then(() => {
  //       toast.success("URL copied to clipboard");
  //     })
  //     .catch(() => {
  //       toast.error("Failed to copy URL");
  //     });
  // };
  console.log(submissions);
  return (
    <div className="my-3">
      <div className="flex justify-left mb-6">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-sm shadow-none sm:w-full md:w-1/2 lg:w-80"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-sm" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-gray-50 w-full rounded-sm border border-gray-200">
          <CircleAlert className="size-6 mb-2" />
          <span className="text-md">{error}</span>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 w-full rounded-sm border border-gray-200">
          <CircleAlert className="size-6 mb-2" />
          <span className="text-md">No submissions found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSubmissions.map((submission) => (
            <Sheet
              key={submission.id}
              open={openId === submission.id}
              onOpenChange={(open) =>
                setOpenId(open ? submission.id : undefined)
              }
            >
              <Card className="flex flex-col rounded-md shadow-sm py-4 pb-6 gap-1 hover:shadow-lg transition cursor-pointer border-gray-200 shadow-gray-100 hover:shadow-gray-200">
                {/* comment out in case we need this in the future */}
                {/* <div className="w-full flex justify-end pr-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex h-6 w-6 rounded-xs"
                        onClick={() => handleCopyUrl(submission.id)}
                      >
                        <ClipboardIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy the URL</p>
                    </TooltipContent>
                  </Tooltip>
                </div> */}
                <SheetTrigger asChild className="w-full">
                  <CardContent className="px-3 w-full">
                    {/* <PDFThumbnail
                      pdfUrl={`/api/output/${submission.id}`}
                      className="mb-3 w-full border border-gray-100 rounded-xs overflow-clip flex justify-center items-center"
                      onItemClick={() => setOpenId(submission.id)}
                    /> */}
                    {submission.output === "pdf" ? (
                      <PDFThumbnail
                        pdfUrl={`/api/output/${submission.id}`}
                        className="mb-3 w-full border h-60 border-gray-100 rounded-xs overflow-clip flex justify-center items-center"
                        onItemClick={() => setOpenId(submission.id)}
                      />
                    ) : (
                      <div
                        className="mb-3 w-full h-60 border border-gray-100 rounded-xs"
                        onClick={() => setOpenId(submission.id)}
                      >
                        <iframe
                          src={`/api/output/${submission.id}`}
                          className="block"
                          style={{
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                            width: "200%",
                            height: "200%",
                          }}
                        />
                      </div>
                    )}
                    <div className="font-semibold text-lg">
                      {submission.first_name} {submission.last_name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-semibold">Submitted on</span>
                      <br />
                      {formatDateTime(submission.updated_at)}
                    </div>
                  </CardContent>
                </SheetTrigger>
              </Card>
              <SheetContent
                side="right"
                className="h-full min-w-1/2"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <SheetHeader>
                  <SheetTitle>
                    Submission by {submission.first_name} {submission.last_name}
                  </SheetTitle>
                </SheetHeader>
                {submission.output === "pdf" ? (
                  <PdfViewer pdfUrl={`/api/output/${submission.id}`} />
                ) : (
                  <HTMLViewer htmlUrl={`/api/output/${submission.id}`} />
                )}
              </SheetContent>
            </Sheet>
          ))}
        </div>
      )}
    </div>
  );
}
