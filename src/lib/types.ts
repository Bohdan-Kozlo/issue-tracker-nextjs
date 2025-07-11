export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  data?: Record<string, unknown>;
};

// Transformed Issue type that matches the data returned by getIssues
import { Issue as PrismaIssue } from "@prisma/client";

export interface TransformedIssue
  extends Omit<PrismaIssue, "labels" | "status" | "priority"> {
  labels: string[];
  createdById: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
}
