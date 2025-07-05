"use client";

import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import BackButton from "@/components/BackButton";
import GradientHeading from "@/components/GradientHeading";
import FormField from "@/components/FormField";
import { Input, Textarea, Select } from "@/components/Input";
import Button from "@/components/Button";
import { createIssue } from "@/lib/server-actions/issue-actions";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { ActionResponse } from "@/lib/types";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function NewIssue() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    const response = await createIssue(formData);

    if (response.success) {
      toast.success(response.message);
      if (response.data?.id) {
        router.push(`/issues/${response.data.id}`);
      } else {
        router.push("/dashboard");
      }
    } else {
      toast.error(response.message);
    }

    return response;
  }, initialState);

  return (
    <PageLayout>
      <BackButton href="/dashboard" label="Back to Dashboard" />

      <GradientHeading
        title="Create New Issue"
        subtitle="Report a bug, request a feature, or start a discussion"
      />

      {/* Create Form */}
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
              placeholder="Provide a detailed description of the issue. Include steps to reproduce, expected behavior, and actual behavior."
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
              <Select name="status" required disabled={isPending}>
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
                defaultValue="medium"
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
                Creating...
              </>
            ) : (
              "Create Issue"
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}
