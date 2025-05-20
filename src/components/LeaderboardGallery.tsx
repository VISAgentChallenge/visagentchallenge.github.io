"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PDFThumbnail from "./PDFThumbnail";

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

// mock data to test before server has data
// const mockSubmissions: Submission[] = [
//   {
//     id: 1,
//     status: "completed",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     score: 95,
//     isFinal: true,
//     metrics: {},
//     username: "jdoe",
//     email: "jdoe@example.com",
//     first_name: "John",
//     last_name: "Doe",
//   },
//   {
//     id: 2,
//     status: "completed",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     score: 88,
//     isFinal: true,
//     metrics: {},
//     username: "asmith",
//     email: "asmith@example.com",
//     first_name: "Alice",
//     last_name: "Smith",
//   },
//   {
//     id: 3,
//     status: "completed",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     score: 76,
//     isFinal: true,
//     metrics: {},
//     username: "bwayne",
//     email: "bwayne@example.com",
//     first_name: "Bruce",
//     last_name: "Wayne",
//   },
// ];

export default function LeaderboardGallery() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("api/leaderboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response:", res);
        const data = await res.json();
        setSubmissions(data.submissions);
        // setSubmissions(mockSubmissions);
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
    return (
      fullName.includes(search.toLowerCase()) ||
      s.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="m-3">
      <div className="flex justify-left mb-6">
        <Input
          type="text"
          placeholder="Search by name or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))
          : filteredSubmissions.map((submission) => (
              <Card
                key={submission.id}
                className="rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <CardContent className="p-4">
                  {/* add pdf link preview */}
                  {/* <a href="" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                      alt="PDF Icon"
                      className="w-full h-40 object-contain bg-gray-100 rounded-xl mb-3"
                    />
                  </a> */}
                  <PDFThumbnail
                    pdfUrl="https://arxiv.org/pdf/2408.01703"
                    className="rounded-xl mb-3 w-full"
                  />
                  <div className="font-semibold text-lg">
                    {submission.first_name} {submission.last_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    @{submission.username}
                  </div>
                  <div className="mt-2 text-sm">
                    Score:{" "}
                    <span className="font-medium">{submission.score}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Updated: {new Date(submission.updated_at).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
