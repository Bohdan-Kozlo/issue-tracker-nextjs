"use client";

import { useState } from "react";
import Button from "./Button";
import { handleDeleteIssue } from "@/server-actions/issue-actions";

interface DeleteIssueDialogProps {
  issueId: string;
  issueTitle: string;
}

export default function DeleteIssueDialog({
  issueId,
  issueTitle,
}: DeleteIssueDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const openDialog = () => {
    setError("");
    setIsDeleting(false);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setIsDeleting(false);
  };

  const handleDelete = async (formData: FormData) => {
    setIsDeleting(true);
    setError("");

    try {
      const result = await handleDeleteIssue(formData);
      if (result && !result.success) {
        setError(result.error || result.message || "Failed to delete issue");
        setIsDeleting(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsDeleting(false);
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={openDialog}>
        Delete Issue
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Delete Issue</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the issue:{" "}
              <span className="font-semibold text-white">{issueTitle}</span>?
              <br />
              This action cannot be undone.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <form action={handleDelete}>
              <input type="hidden" name="id" value={issueId} />
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeDialog}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="danger" disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Issue"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
