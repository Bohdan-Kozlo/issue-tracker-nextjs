"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data for demonstration
const mockIssue = {
  id: 1,
  title: "Fix navigation bug in mobile view",
  description:
    "The navigation menu doesn't work properly on mobile devices. When users tap the hamburger menu, it opens but clicking on menu items doesn't navigate to the correct pages. This issue affects user experience significantly on mobile platforms.",
  status: "Open",
  priority: "High",
  assignedTo: "john-doe",
  labels: ["bug", "mobile", "navigation"],
};

const mockUsers = [
  { id: "john-doe", name: "John Doe" },
  { id: "jane-smith", name: "Jane Smith" },
  { id: "mike-johnson", name: "Mike Johnson" },
  { id: "sarah-wilson", name: "Sarah Wilson" },
];

export default function IssueEdit() {
  const [formData, setFormData] = useState({
    title: mockIssue.title,
    description: mockIssue.description,
    status: mockIssue.status,
    priority: mockIssue.priority,
    assignedTo: mockIssue.assignedTo,
    labels: mockIssue.labels.join(", "),
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-20 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-radial from-[#ff6600]/10 via-[#ff6600]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href={`/issues/${mockIssue.id}`}
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
            Back to Issue Details
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ffae42] bg-clip-text text-transparent mb-2">
            Edit Issue #{mockIssue.id}
          </h1>
          <p className="text-gray-400 text-lg">
            Update issue details and settings
          </p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Information */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Issue Information
            </h2>

            {/* Title */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
                placeholder="Enter issue title"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe the issue in detail"
              />
            </div>

            {/* Labels */}
            <div>
              <label
                htmlFor="labels"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Labels
              </label>
              <input
                type="text"
                id="labels"
                name="labels"
                value={formData.labels}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
                placeholder="Enter labels separated by commas (e.g., bug, mobile, navigation)"
              />
              <p className="text-sm text-gray-400 mt-1">
                Separate multiple labels with commas
              </p>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Status & Priority
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
                >
                  <option value="Open" className="bg-gray-800">
                    Open
                  </option>
                  <option value="In Progress" className="bg-gray-800">
                    In Progress
                  </option>
                  <option value="Closed" className="bg-gray-800">
                    Closed
                  </option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Priority *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
                >
                  <option value="Low" className="bg-gray-800">
                    Low
                  </option>
                  <option value="Medium" className="bg-gray-800">
                    Medium
                  </option>
                  <option value="High" className="bg-gray-800">
                    High
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Assignment
            </h2>

            <div>
              <label
                htmlFor="assignedTo"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Assigned To
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
              >
                <option value="" className="bg-gray-800">
                  Unassigned
                </option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id} className="bg-gray-800">
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                href={`/issues/${mockIssue.id}`}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 border border-white/20 text-center font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-medium transition-all duration-200 transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 mt-6">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            Danger Zone
          </h2>
          <p className="text-gray-400 mb-6">
            Once you delete an issue, there is no going back. Please be certain.
          </p>
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200 border border-red-500/30 font-medium"
          >
            Delete Issue
          </button>
        </div>
      </div>
    </main>
  );
}
