import PageLayout from "@/components/PageLayout";
import BackButton from "@/components/BackButton";
import GradientHeading from "@/components/GradientHeading";
import FormField from "@/components/FormField";
import { Input, Textarea, Select } from "@/components/Input";
import Button from "@/components/Button";

// Mock data for demonstration
const mockUsers = [
  { id: "john-doe", name: "John Doe" },
  { id: "jane-smith", name: "Jane Smith" },
  { id: "mike-johnson", name: "Mike Johnson" },
  { id: "sarah-wilson", name: "Sarah Wilson" },
];

export default function NewIssue() {
  return (
    <PageLayout>
      <BackButton href="/dashboard" label="Back to Dashboard" />

      <GradientHeading
        title="Create New Issue"
        subtitle="Report a bug, request a feature, or start a discussion"
      />

      {/* Create Form */}
      <form className="space-y-6">
        {/* Main Information */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Issue Information
          </h2>

          <FormField label="Title" required>
            <Input
              type="text"
              name="title"
              required
              placeholder="Brief description of the issue"
            />
          </FormField>

          <FormField label="Description" required>
            <Textarea
              name="description"
              required
              rows={8}
              placeholder="Provide a detailed description of the issue. Include steps to reproduce, expected behavior, and actual behavior."
            />
          </FormField>

          <FormField
            label="Labels"
            hint="Add labels to help categorize this issue (e.g., bug, feature, enhancement)"
          >
            <Input
              type="text"
              name="labels"
              placeholder="Enter labels separated by commas (e.g., bug, mobile, urgent)"
            />
          </FormField>
        </div>

        {/* Priority and Assignment */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Priority & Assignment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Priority" required>
              <Select name="priority" required>
                <option value="Low" className="bg-gray-800">
                  Low - Minor issues, nice to have
                </option>
                <option value="Medium" className="bg-gray-800">
                  Medium - Standard issues
                </option>
                <option value="High" className="bg-gray-800">
                  High - Critical issues, needs attention
                </option>
              </Select>
            </FormField>

            <FormField label="Assign To">
              <Select name="assignedTo">
                <option value="" className="bg-gray-800">
                  Unassigned
                </option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id} className="bg-gray-800">
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
        </div>

        {/* Issue Type Templates */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Quick Templates
          </h2>
          <p className="text-gray-400 mb-4">
            Use these templates to quickly fill common issue types:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left hover:bg-red-500/20 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="font-medium text-red-400">Bug Report</span>
              </div>
              <p className="text-sm text-gray-400">
                Report a bug or unexpected behavior
              </p>
            </button>

            <button
              type="button"
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left hover:bg-blue-500/20 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="font-medium text-blue-400">
                  Feature Request
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Suggest a new feature or enhancement
              </p>
            </button>

            <button
              type="button"
              className="p-4 rounded-xl bg-[#ff6600]/10 border border-[#ff6600]/20 text-left hover:bg-[#ff6600]/20 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-[#ffae42]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="font-medium text-[#ffae42]">Task</span>
              </div>
              <p className="text-sm text-gray-400">
                Create a general task or todo item
              </p>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="secondary"
              type="button"
              className="w-full sm:w-auto"
            >
              Save as Draft
            </Button>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Create Issue
            </Button>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}
