import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string().uuid("Invalid comment ID format"),
  text: z
    .string()
    .min(1, "Comment content is required")
    .max(2000, "Comment must not exceed 2000 characters")
    .trim(),
  issueId: z.string().uuid("Invalid issue ID format"),
  authorId: z.string().uuid("Invalid user ID format"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CommentCreateSchema = CommentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Comment update schema (only text can be updated)
export const CommentUpdateSchema = z.object({
  id: z.string().uuid("Invalid comment ID format"),
  text: z
    .string()
    .min(1, "Comment content is required")
    .max(2000, "Comment must not exceed 2000 characters")
    .trim(),
});

// Comment with author information
export const CommentWithAuthorSchema = CommentSchema.extend({
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    picture: z.string().optional().nullable(),
  }),
});

// Type inference
export type Comment = z.infer<typeof CommentSchema>;
export type CommentCreate = z.infer<typeof CommentCreateSchema>;
export type CommentUpdate = z.infer<typeof CommentUpdateSchema>;
export type CommentWithAuthor = z.infer<typeof CommentWithAuthorSchema>;
