"use client";

import { ZipUploader } from "@/components/ZipUploader";

export default function Submission() {
  return (
    <div className="p-12 flex flex-col gap-4">
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-24">
          {/* individual leaderboard */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Your submissions`}</h2>
            <span className="text-muted-foreground">
              {`The below leaderboard shows your submissions. Click on the submission ID to view the PDF.`}
            </span>
          </div>

          {/* submit portal */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{`Submit Here`}</h2>
            <span className="text-muted-foreground">
              {`You can submit a new task here. The submission will be automatically graded and the results will be shown in the leaderboard above.`}
            </span>
            {/* post task to the server -> app/api/upload */}
            <ZipUploader />
          </div>
        </div>
      </div>
    </div>
  );
}
