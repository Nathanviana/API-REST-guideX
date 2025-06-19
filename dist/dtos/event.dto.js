"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    startDate: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "startDate must be a valid ISO date string" }),
    endDate: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "endDate must be a valid ISO date string" }),
    location: zod_1.z.string().min(1, { message: "Location is required" }),
});
