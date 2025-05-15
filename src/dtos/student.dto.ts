import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1),
  university: z.string().min(1),
  course: z.string().min(1),
  language: z.string().min(1),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
