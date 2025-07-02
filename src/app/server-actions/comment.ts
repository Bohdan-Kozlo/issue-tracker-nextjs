"use server";

import { ActionResponse } from "@/lib/types";
import { CommentCreateSchema } from "@/lib/schemas/comment";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createComment(
  formData: FormData
): Promise<ActionResponse> {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to comment",
      };
    }

    // Parse and validate form data
    const data = Object.fromEntries(formData.entries());
    const parsed = CommentCreateSchema.safeParse({
      ...data,
      authorId: session.userId,
    });

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    // Create comment in database
    const comment = await prisma.comment.create({
      data: parsed.data,
    });

    return {
      success: true,
      message: "Comment added successfully",
      data: { id: comment.id },
    };
  } catch (error) {
    console.error("Comment creation error:", error);
    return {
      success: false,
      message: "Failed to add comment",
      error: "An unexpected error occurred",
    };
  }
}

export async function getCommentsByIssueId(issueId: string) {
  // Verify user is authenticated
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        issueId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            picture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
