import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      { message: "startDate must be a valid ISO date string" }
    ),
  endDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      { message: "endDate must be a valid ISO date string" }
    ),
  location: z.string().min(1, { message: "Location is required" }),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
