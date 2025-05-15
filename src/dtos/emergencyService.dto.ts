import { z } from "zod";

export const createEmergencyServiceSchema = z.object({
  serviceName: z.string().min(1, { message: "Service name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  type: z.string().min(1, { message: "Type of service is required" }),
});

export type CreateEmergencyServiceInput = z.infer<typeof createEmergencyServiceSchema>;
