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
import { AlertCircle, FileText } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

export default function Submission() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <Table className="border-separate border-spacing-0 border border-gray-300 rounded-sm overflow-clip">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="px-4">ID</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Submitted At</TableHead>
                    <TableHead className="text-center">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                        <span className="flex justify-center items-center gap-2">
                          <AlertCircle />
                          No submissions present.
                        </span>
                      </TableCell>
                    </TableRow>
                  ) : (
                    submissions.map((submission: any) => (
                      <TableRow key={submission.id}>
                        <TableCell className="px-4">{submission.id}</TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={submission.status} />
                        </TableCell>
                        <TableCell className="text-center">
                          {formatDateTime(submission.created_at)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="link" className="cursor-pointer">
                            <FileText />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* submit portal */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">Submit Here</h2>
            <span className="text-muted-foreground">
              You can submit a new task here. The submission will be automatically graded and the
              results will be shown in the leaderboard above.
            </span>
            {/* post task to the server -> app/api/upload */}
            <ZipUploader />
          </div>
        </div>
      </div>
    </div>
  );
}
