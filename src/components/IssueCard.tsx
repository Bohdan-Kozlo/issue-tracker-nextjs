import Link from "next/link";
import { getStatusStyles, getPriorityStyles } from "@/lib/styles";
import { TransformedIssue } from "@/lib/types";

interface IssueCardProps {
  issue: TransformedIssue;
}

// Helper function to get priority icon
const getPriorityIcon = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    case "medium":
      return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z";
    case "low":
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    default:
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }
};

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
      {/* Issue Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-[#ffae42] transition-colors duration-200">
          {issue.title}
        </h3>
        <div className="flex items-center gap-2 ml-3">
          <svg
            className={`w-5 h-5 ${getPriorityStyles(issue.priority)}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={getPriorityIcon(issue.priority)}
            />
          </svg>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
            issue.status
          )}`}
        >
          {issue.status}
        </span>
        <span
          className={`text-sm font-medium ${getPriorityStyles(issue.priority)}`}
        >
          {issue.priority}
        </span>
      </div>

      {/* Created date and comments */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
        <span>Created {new Date(issue.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Link
          href={`/issues/${issue.id}`}
          className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white text-center font-medium transition-all duration-200 transform hover:scale-105"
        >
          View Details
        </Link>
        <Link
          href={`/issues/${issue.id}/edit`}
          className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 border border-white/20"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
