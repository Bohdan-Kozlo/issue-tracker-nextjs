"use server";

import { deleteIssue, changeIssueStatus } from "./issue";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Handle issue deletion
export async function handleDeleteIssue(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Issue ID is required");
  }

  const result = await deleteIssue(id);

  if (result.success) {
    // Redirect to dashboard after successful deletion
    redirect("/dashboard");
  } else {
    console.error("Failed to delete issue:", result.error || result.message);
    return result;
  }
}

// Handle status change
export async function handleChangeStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id || !status) {
    throw new Error("Issue ID and status are required");
  }

  const result = await changeIssueStatus(id, status);

  if (result.success) {
    // Revalidate the current page to reflect the changes
    revalidatePath(`/issues/${id}`);
    return result;
  } else {
    console.error(
      "Failed to change issue status:",
      result.error || result.message
    );
    return result;
  }
}
