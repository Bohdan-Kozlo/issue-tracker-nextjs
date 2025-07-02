"use server";

import { ActionResponse } from "@/lib/types";
import { IssueCreateSchema, IssueUpdateSchema } from "@/lib/schemas/issue";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createIssue(formData: FormData): Promise<ActionResponse> {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to create an issue",
      };
    }

    // Parse and validate form data
    const data = Object.fromEntries(formData.entries());
    const parsed = IssueCreateSchema.safeParse({
      ...data,
      createdById: session.userId, // This field will be renamed to createdBy when creating the issue
    });

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    // Convert status and priority to enum values
    const { status, priority, labels, createdById, ...rest } = parsed.data;

    const statusEnum = status.toUpperCase() as
      | "OPEN"
      | "IN_PROGRESS"
      | "CLOSED";
    const priorityEnum = priority.toUpperCase() as "LOW" | "MEDIUM" | "HIGH";

    // Create issue in database
    const issue = await prisma.issue.create({
      data: {
        ...rest,
        status: statusEnum,
        priority: priorityEnum,
        labels: Array.isArray(labels) ? labels.join(",") : "",
        createdBy: createdById,
      },
    });

    return {
      success: true,
      message: "Issue created successfully",
      data: { id: issue.id },
    };
  } catch (error) {
    console.error("Issue creation error:", error);
    return {
      success: false,
      message: "Failed to create issue",
      error: "An unexpected error occurred",
    };
  }
}

export async function updateIssue(formData: FormData): Promise<ActionResponse> {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to update an issue",
      };
    }

    // Parse and validate form data
    const data = Object.fromEntries(formData.entries());
    const parsed = IssueUpdateSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { id, status, priority, labels, ...rest } = parsed.data;

    // Verify the issue exists and user has permission to edit it
    const existingIssue = await prisma.issue.findUnique({
      where: { id },
    });

    if (!existingIssue) {
      return {
        success: false,
        message: "Issue not found",
        error: "The issue you're trying to update doesn't exist",
      };
    }

    if (existingIssue.createdBy !== session.userId) {
      return {
        success: false,
        message: "Permission denied",
        error: "You don't have permission to update this issue",
      };
    }

    // Convert status and priority to enum values if provided
    const updateData: Record<string, string | Date | null> = { ...rest };

    if (status) {
      updateData.status = status.toUpperCase() as
        | "OPEN"
        | "IN_PROGRESS"
        | "CLOSED";
    }

    if (priority) {
      updateData.priority = priority.toUpperCase() as "LOW" | "MEDIUM" | "HIGH";
    }

    if (labels) {
      updateData.labels = Array.isArray(labels) ? labels.join(",") : "";
    }

    // Update issue in database
    await prisma.issue.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "Issue updated successfully",
    };
  } catch (error) {
    console.error("Issue update error:", error);
    return {
      success: false,
      message: "Failed to update issue",
      error: "An unexpected error occurred",
    };
  }
}

export async function getIssueById(id: string) {
  // Verify user is authenticated
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id },
    });

    if (!issue) {
      return null;
    }

    // Convert labels string to array
    const labels = issue.labels ? issue.labels.split(",") : [];

    // Convert DB enum values to frontend format
    return {
      ...issue,
      labels,
      status: issue.status.toLowerCase(),
      priority: issue.priority.toLowerCase(),
    };
  } catch (error) {
    console.error("Error fetching issue:", error);
    return null;
  }
}

export async function deleteIssue(id: string): Promise<ActionResponse> {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to delete an issue",
      };
    }

    // Verify the issue exists and user has permission to delete it
    const existingIssue = await prisma.issue.findUnique({
      where: { id },
    });

    if (!existingIssue) {
      return {
        success: false,
        message: "Issue not found",
        error: "The issue you're trying to delete doesn't exist",
      };
    }

    if (existingIssue.createdBy !== session.userId) {
      return {
        success: false,
        message: "Permission denied",
        error: "You don't have permission to delete this issue",
      };
    }

    // Delete all comments for the issue first
    await prisma.comment.deleteMany({
      where: { issueId: id },
    });

    // Delete the issue
    await prisma.issue.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Issue deleted successfully",
    };
  } catch (error) {
    console.error("Issue deletion error:", error);
    return {
      success: false,
      message: "Failed to delete issue",
      error: "An unexpected error occurred",
    };
  }
}

export async function changeIssueStatus(
  id: string,
  status: string
): Promise<ActionResponse> {
  try {
    // Verify user is authenticated
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to update an issue's status",
      };
    }

    // Verify the issue exists and user has permission to edit it
    const existingIssue = await prisma.issue.findUnique({
      where: { id },
    });

    if (!existingIssue) {
      return {
        success: false,
        message: "Issue not found",
        error: "The issue you're trying to update doesn't exist",
      };
    }

    // Convert status to enum value
    const statusEnum = status.toUpperCase() as
      | "OPEN"
      | "IN_PROGRESS"
      | "CLOSED";

    // Update issue status in database
    await prisma.issue.update({
      where: { id },
      data: { status: statusEnum },
    });

    return {
      success: true,
      message: "Issue status updated successfully",
    };
  } catch (error) {
    console.error("Issue status update error:", error);
    return {
      success: false,
      message: "Failed to update issue status",
      error: "An unexpected error occurred",
    };
  }
}
