import { z } from "zod";

export const IssueStatusSchema = z.enum(["open", "in_progress", "closed"], {
  errorMap: () => ({
    message: "Status must be either 'open', 'in_progress', or 'closed'",
  }),
});

export const IssuePrioritySchema = z.enum(["low", "medium", "high"], {
  errorMap: () => ({
    message: "Priority must be either 'low', 'medium', or 'high'",
  }),
});

export const IssueSchema = z.object({
  id: z.string().uuid("Invalid issue ID format"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must not exceed 5000 characters")
    .trim(),
  status: IssueStatusSchema,
  priority: IssuePrioritySchema,
  labels: z
    .array(z.string().min(1).max(50))
    .max(10, "Cannot have more than 10 labels")
    .optional()
    .default([]),
  createdById: z.string().uuid("Invalid user ID format"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const IssueCreateSchema = IssueSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  labels: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === "") return [];
      return val
        .split(",")
        .map((label) => label.trim())
        .filter((label) => label.length > 0)
        .slice(0, 10);
    })
    .pipe(z.array(z.string().min(1).max(50))),
});

export const IssueUpdateSchema = z.object({
  id: z.string().uuid("Invalid issue ID format"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must not exceed 5000 characters")
    .trim()
    .optional(),
  status: IssueStatusSchema.optional(),
  priority: IssuePrioritySchema.optional(),
  labels: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === "") return [];
      return val
        .split(",")
        .map((label) => label.trim())
        .filter((label) => label.length > 0)
        .slice(0, 10);
    })
    .pipe(z.array(z.string().min(1).max(50)))
    .optional(),
  assignedToId: z.string().uuid("Invalid user ID format").optional().nullable(),
});

// Issue with relations schema (includes user data)
export const IssueWithRelationsSchema = IssueSchema.extend({
  createdBy: z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
  }),
  assignedTo: z
    .object({
      id: z.string().uuid(),
      username: z.string(),
      email: z.string(),
    })
    .optional()
    .nullable(),
  commentsCount: z.number().int().min(0).optional().default(0),
});

// Type inference
export type Issue = z.infer<typeof IssueSchema>;
export type IssueCreate = z.infer<typeof IssueCreateSchema>;
export type IssueUpdate = z.infer<typeof IssueUpdateSchema>;
export type IssueWithRelations = z.infer<typeof IssueWithRelationsSchema>;
export type IssueStatus = z.infer<typeof IssueStatusSchema>;
export type IssuePriority = z.infer<typeof IssuePrioritySchema>;
