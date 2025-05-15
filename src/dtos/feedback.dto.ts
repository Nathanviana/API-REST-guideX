import { z } from "zod";

export const createFeedbackSchema = z.object({
  studentId: z.number({
    required_error: "Student ID is required",
    invalid_type_error: "Student ID must be a number",
  }),
  accommodationRating: z.number().int().min(0).max(5).optional(),
  eventRating: z.number().int().min(0).max(5).optional(),
  comments: z.string().optional(),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
