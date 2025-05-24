"use client";

import { useEffect, useState } from "react";
import { ZipUploader } from "@/components/ZipUploader";

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
              <table className="min-w-full border mt-4">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Score</th>
                    <th className="border px-4 py-2">Created At</th>
                    <th className="border px-4 py-2">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission: any) => (
                    <tr key={submission.id}>
                      <td className="border px-4 py-2">{submission.id}</td>
                      <td className="border px-4 py-2">{submission.status}</td>
                      <td className="border px-4 py-2">{submission.score}</td>
                      <td className="border px-4 py-2">{submission.created_at}</td>
                      <td className="border px-4 py-2">{submission.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
