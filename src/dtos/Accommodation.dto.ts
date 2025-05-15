import { z } from "zod";

export const createAccommodationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(1, "Description is required"),
  availability: z.boolean()
});

export type CreateAccommodationInput = z.infer<typeof createAccommodationSchema>;