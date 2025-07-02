import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import BackButton from "@/components/BackButton";
import Comment from "@/components/Comment";
import Button from "@/components/Button";
import DeleteIssueDialog from "@/components/DeleteIssueDialog";
import ChangeStatusDialog from "@/components/ChangeStatusDialog";
import { getIssueById } from "@/app/server-actions/issue";
import { getCommentsByIssueId } from "@/app/server-actions/comment";
import { handleCreateComment } from "@/app/server-actions/comment-actions";
import { notFound } from "next/navigation";

// Helper functions
const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "in_progress":
    case "in progress":
      return "bg-[#ff6600]/20 text-[#ffae42] border-[#ff6600]/30";
    case "closed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

// Helper functions from comment-actions.ts are imported above

const getPriorityStyles = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "medium":
      return "bg-[#ff6600]/20 text-[#ffae42] border-[#ff6600]/30";
    case "low":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Define the params type
interface IssueDetailsParams {
  params: {
    id: string;
  };
}

export default async function IssueDetails({ params }: IssueDetailsParams) {
  const { id: issueId } = await params;
  const issue = await getIssueById(issueId);
  const comments = await getCommentsByIssueId(issueId);

  if (!issue) {
    notFound();
  }
  return (
    <PageLayout className="max-w-4xl">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      {/* Issue Header */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-400">Issue #{issue.id}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                  issue.status
                )}`}
              >
                {issue.status.replace("_", " ")}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityStyles(
                  issue.priority
                )}`}
              >
                {issue.priority.charAt(0).toUpperCase() +
                  issue.priority.slice(1)}{" "}
                Priority
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              {issue.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {issue.labels.map((label, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-[#ff6600]/10 text-[#ffae42] text-sm border border-[#ff6600]/20"
                >
                  #{label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Created by:</span>
                <span className="text-white ml-2">
                  User ID: {issue.createdBy}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Created:</span>
                <span className="text-white ml-2">
                  {formatDate(issue.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Updated:</span>
                <span className="text-white ml-2">
                  {formatDate(issue.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 lg:min-w-[200px]">
            <Link href={`/issues/${issue.id}/edit`}>
              <Button className="w-full">Edit Issue</Button>
            </Link>
            <ChangeStatusDialog
              issueId={issue.id}
              currentStatus={issue.status}
            />
            <DeleteIssueDialog issueId={issue.id} issueTitle={issue.title} />
          </div>
        </div>
      </div>

      {/* Issue Description */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {issue.description || "No description provided."}
        </p>
      </div>

      {/* Comments Section */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Comments ({comments.length})
          </h2>
        </div>

        {/* Comment form */}
        <form
          action={handleCreateComment}
          className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10"
        >
          <input type="hidden" name="issueId" value={issue.id} />
          <textarea
            name="text"
            placeholder="Write a comment..."
            className="w-full h-24 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 resize-none"
            required
          />
          <div className="flex justify-end mt-3">
            <Button type="submit" size="sm">
              Post Comment
            </Button>
          </div>
        </form>

        {/* Comments list */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-center text-gray-400 py-6">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
