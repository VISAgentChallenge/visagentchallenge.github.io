import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const FinalizedSubmissionLinks: React.FC<{
  finalSubmissionId?: string;
}> = ({ finalSubmissionId }) => {
  const outputUrl = finalSubmissionId
    ? `${window.location.origin}/api/output/${finalSubmissionId}`
    : "";
  const zipUrl = finalSubmissionId
    ? `${window.location.origin}/api/submission/${finalSubmissionId}`
    : "";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return finalSubmissionId ? (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">Here're your finalized submission links</span>
      <Card className="shadow-none rounded-md p-2 flex flex-col gap-3">
        <CardContent className="p-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col text-xs gap-1">
              <span className="text-neutral-500 mr-2">Generated output</span>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <span
                    onClick={() => handleCopy(outputUrl)}
                    className="cursor-pointer group flex items-center justify-between bg-neutral-50 p-2 rounded-sm"
                  >
                    {outputUrl}
                    <Copy className="size-4 invisible group-hover:visible" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>Click to copy</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col text-xs gap-1">
              <span className="text-neutral-500 mr-2">Agent code (zip file)</span>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <span
                    onClick={() => handleCopy(zipUrl)}
                    className=" cursor-pointer group flex items-center justify-between bg-neutral-50 p-2 rounded-sm"
                  >
                    {zipUrl}
                    <Copy className="invisible group-hover:visible size-4" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>Click to copy</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <span className="font-semibold">No finalized submission</span>
      <Card className="bg-amber-50 border-none shadow-none rounded-md p-2 flex flex-col">
        <CardContent className="flex flex-col gap-2 p-2">
          <CardDescription className="text-amber-500">
            You haven't finalized any of your submissions yet. Finalize one of your submission to
            copy links to its output (pdf or html) and code (zip). Click on "Mark as Final" button
            in the submission row to finalize that submission.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalizedSubmissionLinks;
