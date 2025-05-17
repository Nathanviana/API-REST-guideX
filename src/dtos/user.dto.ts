import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  name: z.string().optional(),
  role: z.string().optional(),
  userType: z.enum(["normal", "student"]),
  country: z.string().optional(),
  university: z.string().optional(),
  course: z.string().optional(),
  language: z.string().optional(),
});

const userSchema = createUserSchema.superRefine((data, ctx) => {
  if (data.userType === "student") {
    if (!data.university) {
      ctx.addIssue({
        path: ["university"],
        message: "University is required for students",
        code: "custom",
      });
    }
    if (!data.course) {
      ctx.addIssue({
        path: ["course"],
        message: "Course is required for students",
        code: "custom",
      });
    }
  }
});

export { userSchema, createUserSchema };
