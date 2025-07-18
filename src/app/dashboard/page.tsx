import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import GradientHeading from "@/components/GradientHeading";
import StatusFilterButtons from "@/components/StatusFilterButtons";
import IssueCard from "@/components/IssueCard";
import { getIssues } from "@/server-actions/issue-actions";

export default async function Dashboard() {
  const issues = await getIssues();

  return (
    <PageLayout>
      <GradientHeading
        title="My Issues"
        subtitle="Manage and track your assigned tasks"
      />

      <StatusFilterButtons />

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>

      {/* Empty state (if no issues) */}
      {issues.length === 0 && (
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
    </PageLayout>
  );
}
