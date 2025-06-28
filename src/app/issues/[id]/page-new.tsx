import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import BackButton from "@/components/BackButton";
import Comment from "@/components/Comment";
import Button from "@/components/Button";

// Mock data for demonstration
const mockIssue = {
  id: 1,
  title: "Fix navigation bug in mobile view",
  description:
    "The navigation menu doesn't work properly on mobile devices. When users tap the hamburger menu, it opens but clicking on menu items doesn't navigate to the correct pages. This issue affects user experience significantly on mobile platforms.",
  status: "Open",
  priority: "High",
  assignedTo: "John Doe",
  createdBy: "Jane Smith",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-16T14:20:00Z",
  labels: ["bug", "mobile", "navigation"],
};

const mockComments = [
  {
    id: 1,
    author: "Jane Smith",
    content:
      "I've reproduced this issue on both iOS and Android devices. The problem seems to be related to the z-index of the menu overlay.",
    createdAt: "2024-01-15T11:45:00Z",
    avatar: "JS",
  },
  {
    id: 2,
    author: "Mike Johnson",
    content:
      "I can confirm this issue. It's affecting our mobile conversion rate. Should we prioritize this for the next sprint?",
    createdAt: "2024-01-15T15:20:00Z",
    avatar: "MJ",
  },
  {
    id: 3,
    author: "John Doe",
    content:
      "I'm working on a fix. Will have it ready for testing by tomorrow. The issue is in the mobile CSS media queries.",
    createdAt: "2024-01-16T09:15:00Z",
    avatar: "JD",
  },
];

// Helper functions
const getStatusStyles = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "In Progress":
      return "bg-[#ff6600]/20 text-[#ffae42] border-[#ff6600]/30";
    case "Closed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Medium":
      return "bg-[#ff6600]/20 text-[#ffae42] border-[#ff6600]/30";
    case "Low":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function IssueDetails() {
  return (
    <PageLayout className="max-w-4xl">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      {/* Issue Header */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-400">
                Issue #{mockIssue.id}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                  mockIssue.status
                )}`}
              >
                {mockIssue.status}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityStyles(
                  mockIssue.priority
                )}`}
              >
                {mockIssue.priority} Priority
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              {mockIssue.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {mockIssue.labels.map((label, index) => (
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
                <span className="text-white ml-2">{mockIssue.createdBy}</span>
              </div>
              <div>
                <span className="text-gray-400">Assigned to:</span>
                <span className="text-white ml-2">{mockIssue.assignedTo}</span>
              </div>
              <div>
                <span className="text-gray-400">Created:</span>
                <span className="text-white ml-2">
                  {formatDate(mockIssue.createdAt)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Updated:</span>
                <span className="text-white ml-2">
                  {formatDate(mockIssue.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 lg:min-w-[200px]">
            <Link href={`/issues/${mockIssue.id}/edit`}>
              <Button className="w-full">Edit Issue</Button>
            </Link>
            <Button variant="secondary">Change Status</Button>
            <Button variant="danger">Delete Issue</Button>
          </div>
        </div>
      </div>

      {/* Issue Description */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {mockIssue.description}
        </p>
      </div>

      {/* Comments Section */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Comments ({mockComments.length})
          </h2>
          <Button size="sm">Add Comment</Button>
        </div>

        {/* Comment form */}
        <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <textarea
            placeholder="Write a comment..."
            className="w-full h-24 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 resize-none"
          />
          <div className="flex justify-end mt-3">
            <Button size="sm">Post Comment</Button>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-6">
          {mockComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
