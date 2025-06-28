"use client";

import Link from "next/link";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import BackButton from "@/components/BackButton";
import GradientHeading from "@/components/GradientHeading";
import FormField from "@/components/FormField";
import { Input, Textarea, Select } from "@/components/Input";
import Button from "@/components/Button";

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
    <PageLayout>
      <BackButton
        href={`/issues/${mockIssue.id}`}
        label="Back to Issue Details"
      />

      <GradientHeading
        title={`Edit Issue #${mockIssue.id}`}
        subtitle="Update issue details and settings"
      />

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Information */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Issue Information
          </h2>

          <FormField label="Title" required>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter issue title"
            />
          </FormField>

          <FormField label="Description" required>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Describe the issue in detail"
            />
          </FormField>

          <FormField label="Labels" hint="Separate multiple labels with commas">
            <Input
              type="text"
              name="labels"
              value={formData.labels}
              onChange={handleInputChange}
              placeholder="Enter labels separated by commas (e.g., bug, mobile, navigation)"
            />
          </FormField>
        </div>

        {/* Status and Priority */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Status & Priority
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Status" required>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
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
              </Select>
            </FormField>

            <FormField label="Priority" required>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
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
              </Select>
            </FormField>
          </div>
        </div>

        {/* Assignment */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Assignment</h2>

          <FormField label="Assigned To">
            <Select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
            >
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

        {/* Action Buttons */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href={`/issues/${mockIssue.id}`}>
              <Button variant="secondary" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 mt-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-gray-400 mb-6">
          Once you delete an issue, there is no going back. Please be certain.
        </p>
        <Button variant="danger">Delete Issue</Button>
      </div>
    </PageLayout>
  );
}
