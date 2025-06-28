import Link from "next/link";

// Mock data for demonstration
const mockIssues = [
  {
    id: 1,
    title: "Fix navigation bug in mobile view",
    status: "Open",
    priority: "High",
    createdAt: "2 hours ago",
    commentsCount: 3,
  },
  {
    id: 2,
    title: "Implement user authentication system",
    status: "In Progress",
    priority: "Medium",
    createdAt: "1 day ago",
    commentsCount: 7,
  },
  {
    id: 3,
    title: "Update documentation for API endpoints",
    status: "Closed",
    priority: "Low",
    createdAt: "3 days ago",
    commentsCount: 2,
  },
  {
    id: 4,
    title: "Optimize database queries for better performance",
    status: "Open",
    priority: "High",
    createdAt: "5 hours ago",
    commentsCount: 1,
  },
  {
    id: 5,
    title: "Add dark mode toggle functionality",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2 days ago",
    commentsCount: 5,
  },
  {
    id: 6,
    title: "Add dark mode toggle functionality",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2 days ago",
    commentsCount: 5,
  },
  {
    id: 7,
    title: "Add dark mode toggle functionality",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2 days ago",
    commentsCount: 5,
  },
];

// Helper function to get status badge styles
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

// Helper function to get priority styles
const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-400";
    case "Medium":
      return "text-[#ffae42]";
    case "Low":
      return "text-green-400";
    default:
      return "text-gray-400";
  }
};

// Helper function to get priority icon
const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "High":
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    case "Medium":
      return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z";
    case "Low":
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    default:
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
  }
};

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-20 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-radial from-[#ff6600]/10 via-[#ff6600]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ffae42] bg-clip-text text-transparent mb-2">
            My Issues
          </h1>
          <p className="text-gray-400 text-lg">
            Manage and track your assigned tasks
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg bg-[#ff6600] text-white font-medium transition-all duration-200">
              All
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-200">
              Open
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-200">
              In Progress
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all duration-200">
              Closed
            </button>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
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
                  className={`text-sm font-medium ${getPriorityStyles(
                    issue.priority
                  )}`}
                >
                  {issue.priority}
                </span>
              </div>

              {/* Created date and comments */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                <span>Created {issue.createdAt}</span>
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
                  <span>{issue.commentsCount}</span>
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
          ))}
        </div>

        {/* Empty state (if no issues) */}
        {mockIssues.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#ff6600]/20 to-[#ffae42]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[#ffae42]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No issues assigned
            </h3>
            <p className="text-gray-400 mb-6">
              You don&apos;t have any issues assigned to you yet.
            </p>
            <Link
              href="/issues/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] text-white font-medium hover:from-[#ffae42] hover:to-[#ff6600] transition-all duration-200"
            >
              Create New Issue
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
