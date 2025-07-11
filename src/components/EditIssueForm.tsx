"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import BackButton from "@/components/BackButton";
import GradientHeading from "@/components/GradientHeading";
import FormField from "@/components/FormField";
import { Input, Textarea, Select } from "@/components/Input";
import Button from "@/components/Button";
import { updateIssue } from "@/server-actions/issue-actions";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { ActionResponse } from "@/lib/types";

interface IssueData {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  labels: string[] | string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function EditIssueForm({ issueId }: { issueId: string }) {
  const router = useRouter();
  const [issue, setIssue] = useState<IssueData | null>(null);
  const [loading, setLoading] = useState(true);

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    formData.append("id", issueId);
    const response = await updateIssue(formData);

    if (response.success) {
      toast.success(response.message);
      router.push(`/issues/${issueId}`);
    } else {
      toast.error(response.message);
    }

    return response;
  }, initialState);

  useEffect(() => {
    const loadIssue = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/issues/${issueId}`);

        if (!response.ok) {
          toast.error("Failed to fetch issue");
          router.push("/dashboard");
          return;
        }

        const issueData = await response.json();
        if (!issueData) {
          toast.error("Issue not found");
          router.push("/dashboard");
          return;
        }

        setIssue({
          id: issueData.id,
          title: issueData.title,
          description: issueData.description,
          status: issueData.status,
          priority: issueData.priority,
          labels: issueData.labels,
          createdBy: issueData.createdBy,
          createdAt: issueData.createdAt,
          updatedAt: issueData.updatedAt,
        });
      } catch (error) {
        toast.error("Failed to load issue");
        console.error("Error loading issue:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIssue();
  }, [issueId, router]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Loading issue...</p>
        </div>
      </PageLayout>
    );
  }

  if (!issue) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-400 text-xl">Issue not found</p>
          <Button
            variant="primary"
            onClick={() => router.push("/dashboard")}
            className="mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <BackButton href={`/issues/${issueId}`} label="Back to Issue" />

      <GradientHeading
        title="Edit Issue"
        subtitle="Update issue details and information"
      />

      {/* Edit Form */}
      <form className="space-y-6" action={formAction}>
        {/* Main Information */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Issue Information
          </h2>

          <FormField label="Title" required error={state.errors?.title?.[0]}>
            <Input
              type="text"
              name="title"
              required
              defaultValue={issue.title}
              placeholder="Brief description of the issue"
              disabled={isPending}
            />
          </FormField>

          <FormField
            label="Description"
            required
            error={state.errors?.description?.[0]}
          >
            <Textarea
              name="description"
              required
              rows={8}
              defaultValue={issue.description || ""}
              placeholder="Provide a detailed description of the issue"
              disabled={isPending}
            />
          </FormField>

          <FormField
            label="Labels"
            hint="Add labels to help categorize this issue"
            error={state.errors?.labels?.[0]}
          >
            <Input
              type="text"
              name="labels"
              defaultValue={
                Array.isArray(issue.labels)
                  ? issue.labels.join(", ")
                  : issue.labels
              }
              placeholder="Enter labels separated by commas (e.g., bug, mobile, urgent)"
              disabled={isPending}
            />
          </FormField>
        </div>

        {/* Priority and Status */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Priority & Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Status"
              required
              error={state.errors?.status?.[0]}
            >
              <Select
                name="status"
                required
                disabled={isPending}
                defaultValue={issue.status}
              >
                <option value="open" className="bg-gray-800">
                  Open - Not yet started
                </option>
                <option value="in_progress" className="bg-gray-800">
                  In Progress - Currently working on it
                </option>
                <option value="closed" className="bg-gray-800">
                  Closed - Issue resolved
                </option>
              </Select>
            </FormField>

            <FormField
              label="Priority"
              required
              error={state.errors?.priority?.[0]}
            >
              <Select
                name="priority"
                required
                disabled={isPending}
                defaultValue={issue.priority}
              >
                <option value="low" className="bg-gray-800">
                  Low - Minor issues, nice to have
                </option>
                <option value="medium" className="bg-gray-800">
                  Medium - Standard issues
                </option>
                <option value="high" className="bg-gray-800">
                  High - Critical issues, needs attention
                </option>
              </Select>
            </FormField>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6 space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update Issue"
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}
