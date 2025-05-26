"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PDFThumbnail from "./PDFThumbnail";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CircleAlert } from "lucide-react";
import PdfViewer from "./PDFViewer";

type Submission = {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  score: number;
  isFinal: boolean;
  metrics: { total_time: number };
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default function LeaderboardGallery() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openId, setOpenId] = useState<number>();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("api/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setSubmissions(data.submissions);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((s) => {
    const fullName = `${s.first_name} ${s.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className="my-3">
      <div className="flex justify-left mb-6">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 rounded-sm shadow-none"
        />
      </div>
      {!loading && filteredSubmissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-gray-50 w-full rounded-sm border border-gray-200">
          <CircleAlert size={48} className="mb-2" />
          <span className="text-md font-medium text-center">Submissions not found.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-sm" />
              ))
            : filteredSubmissions.map((submission) => (
                <Sheet
                  key={submission.id}
                  open={openId === submission.id}
                  onOpenChange={(open) => setOpenId(open ? submission.id : undefined)}
                >
                  <SheetTrigger asChild>
                    <Card className="rounded-md shadow-md hover:shadow-lg transition cursor-pointer border-gray-200 shadow-gray-100">
                      <CardContent className="p-4">
                        <PDFThumbnail
                          pdfUrl={`/api/pdf/${submission.id}`}
                          className="mb-3 w-full border border-gray-100 rounded-xs overflow-clip"
                          onItemClick={() => setOpenId(submission.id)}
                        />
                        <div className="font-semibold text-lg">
                          {submission.first_name} {submission.last_name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="font-semibold">Submitted at:</span>
                          <br />
                          {new Date(submission.updated_at).toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </SheetTrigger>
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
                    <PdfViewer pdfUrl={`/api/pdf/${submission.id}`} />
                  </SheetContent>
                </Sheet>
              ))}
        </div>
      )}
    </div>
  );
}
