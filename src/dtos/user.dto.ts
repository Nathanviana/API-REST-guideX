import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
