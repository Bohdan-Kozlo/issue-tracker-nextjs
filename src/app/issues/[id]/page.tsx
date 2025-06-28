import Link from "next/link";

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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-20 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-radial from-[#ff6600]/10 via-[#ff6600]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ffae42] transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

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
                  <span className="text-white ml-2">
                    {mockIssue.assignedTo}
                  </span>
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
              <Link
                href={`/issues/${mockIssue.id}/edit`}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-medium transition-all duration-200 transform hover:scale-105 text-center"
              >
                Edit Issue
              </Link>
              <button className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 border border-white/20">
                Change Status
              </button>
              <button className="px-6 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 border border-red-500/30">
                Delete Issue
              </button>
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
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-medium transition-all duration-200">
              Add Comment
            </button>
          </div>

          {/* Comment form */}
          <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <textarea
              placeholder="Write a comment..."
              className="w-full h-24 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="flex justify-end mt-3">
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-medium transition-all duration-200">
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-6">
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
