"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3),
    name: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    userType: zod_1.z.enum(["normal", "student"]),
    isActive: zod_1.z.boolean().optional(),
    country: zod_1.z.string().optional(),
    university: zod_1.z.string().optional(),
    course: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
});
exports.createUserSchema = createUserSchema;
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
exports.userSchema = userSchema;
