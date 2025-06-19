"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccommodationSchema = void 0;
const zod_1 = require("zod");
exports.createAccommodationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    address: zod_1.z.string().min(1, "Address is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    availability: zod_1.z.boolean()
});
