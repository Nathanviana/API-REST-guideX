"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedbackSchema = void 0;
const zod_1 = require("zod");
exports.createFeedbackSchema = zod_1.z.object({
    studentId: zod_1.z.number({
        required_error: "Student ID is required",
        invalid_type_error: "Student ID must be a number",
    }),
    accommodationRating: zod_1.z.number().int().min(0).max(5).optional(),
    eventRating: zod_1.z.number().int().min(0).max(5).optional(),
    comments: zod_1.z.string().optional(),
});
