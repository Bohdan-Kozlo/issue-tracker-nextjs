"use server";

import { ActionResponse, TransformedIssue } from "@/lib/types";
import { IssueCreateSchema, IssueUpdateSchema } from "@/lib/schemas/issue";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getIssues(): Promise<TransformedIssue[]> {
  const session = await getSession();

  if (!session?.userId) {
    return redirect("/login");
  }

  try {
    const issues = await prisma.issue.findMany({
      where: {
        createdBy: session.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return issues.map((issue) => ({
      ...issue,
      labels: issue.labels ? issue.labels.split(",").filter(Boolean) : [],
      createdById: issue.createdBy,
      status: issue.status.toLowerCase() as "open" | "in_progress" | "closed",
      priority: issue.priority.toLowerCase() as "low" | "medium" | "high",
    }));
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
}

export async function createIssue(formData: FormData): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to create an issue",
      };
    }

    const data = Object.fromEntries(formData.entries());
    const parsed = IssueCreateSchema.safeParse({
      ...data,
      createdById: session.userId,
    });

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const { status, priority, labels, createdById, ...rest } = parsed.data;

    const statusEnum = status.toUpperCase() as
      | "OPEN"
      | "IN_PROGRESS"
      | "CLOSED";
    const priorityEnum = priority.toUpperCase() as "LOW" | "MEDIUM" | "HIGH";

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
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to update an issue",
      };
    }

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

    const labels = issue.labels ? issue.labels.split(",") : [];

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
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to delete an issue",
      };
    }

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

    await prisma.comment.deleteMany({
      where: { issueId: id },
    });

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
    const session = await getSession();
    if (!session?.userId) {
      return {
        success: false,
        message: "Authentication required",
        error: "You must be logged in to update an issue's status",
      };
    }

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

    const statusEnum = status.toUpperCase() as
      | "OPEN"
      | "IN_PROGRESS"
      | "CLOSED";

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

export async function handleDeleteIssue(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Issue ID is required");
  }

  const result = await deleteIssue(id);

  if (result.success) {
    redirect("/dashboard");
  } else {
    console.error("Failed to delete issue:", result.error || result.message);
    return result;
  }
}

export async function handleChangeStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id || !status) {
    throw new Error("Issue ID and status are required");
  }

  const result = await changeIssueStatus(id, status);

  if (result.success) {
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
