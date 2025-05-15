import { z } from "zod";

export const createTranslationSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  en: z.string().min(1, { message: "English translation is required" }),
  es: z.string().optional(),
  pt: z.string().optional(),
  fr: z.string().optional(),
});

export type CreateTranslationInput = z.infer<typeof createTranslationSchema>;
