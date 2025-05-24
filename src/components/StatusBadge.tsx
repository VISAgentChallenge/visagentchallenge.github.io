import React from "react";

export default function StatusBadge({ status }: { status: string }) {
  let colorClass = "";
  switch (status) {
    case "SUCCESS":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "FAILED":
      colorClass = "bg-red-100 text-red-800";
      break;
    case "RUNNING":
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case "PENDING":
    default:
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
}
