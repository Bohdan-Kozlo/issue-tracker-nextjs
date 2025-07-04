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

// Bulk comment operations schema
export const CommentBulkDeleteSchema = z.object({
  commentIds: z
    .array(z.string().uuid())
    .min(1, "At least one comment ID is required")
    .max(50, "Cannot delete more than 50 comments at once"),
  issueId: z.string().uuid("Invalid issue ID format"), // For additional validation
});

// Comment reaction schema (for future extension)
export const CommentReactionSchema = z.object({
  id: z.string().uuid(),
  commentId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(["like", "dislike", "heart", "laugh", "confused", "rocket"]),
  createdAt: z.date(),
});

// Type inference
export type Comment = z.infer<typeof CommentSchema>;
export type CommentCreate = z.infer<typeof CommentCreateSchema>;
export type CommentUpdate = z.infer<typeof CommentUpdateSchema>;
export type CommentWithAuthor = z.infer<typeof CommentWithAuthorSchema>;
export type CommentBulkDelete = z.infer<typeof CommentBulkDeleteSchema>;
export type CommentReaction = z.infer<typeof CommentReactionSchema>;
