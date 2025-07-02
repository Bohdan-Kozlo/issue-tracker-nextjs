"use server";

import { createComment } from "./comment";

export async function handleCreateComment(formData: FormData) {
  const result = await createComment(formData);

  if (!result.success) {
    console.error("Error creating comment:", result.error || result.message);
    return;
  }
}
