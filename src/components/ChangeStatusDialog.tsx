"use client";

import { useState } from "react";
import Button from "./Button";
import { handleChangeStatus } from "@/server-actions/issue-actions";

interface ChangeStatusDialogProps {
  issueId: string;
  currentStatus: string;
}

export default function ChangeStatusDialog({
  issueId,
  currentStatus,
}: ChangeStatusDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const openDialog = () => {
    setSelectedStatus(currentStatus);
    setError("");
    setIsSubmitting(false);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setIsSubmitting(false);
  };

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
  ];

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const result = await handleChangeStatus(formData);
      if (result.success) {
        setIsSubmitting(false);
        closeDialog();
      } else {
        setError(result.error || result.message || "Failed to change status");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsSubmitting(false);
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={openDialog}>
        Change Status
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">
              Change Issue Status
            </h2>
            <p className="text-gray-300 mb-6">
              Select the new status for this issue:
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <form action={handleSubmit}>
              <input type="hidden" name="id" value={issueId} />

              <div className="mb-6">
                <div className="grid grid-cols-3 gap-3">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`
                        flex items-center justify-center p-3 rounded-lg border cursor-pointer
                        ${
                          selectedStatus === option.value
                            ? "bg-[#ff6600]/20 border-[#ff6600]/50 text-white"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={selectedStatus === option.value}
                        onChange={() => setSelectedStatus(option.value)}
                        className="sr-only"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || selectedStatus === currentStatus}
                >
                  {isSubmitting ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
