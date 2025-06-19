"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmergencyServiceSchema = void 0;
const zod_1 = require("zod");
exports.createEmergencyServiceSchema = zod_1.z.object({
    serviceName: zod_1.z.string().min(1, { message: "Service name is required" }),
    phoneNumber: zod_1.z.string().min(1, { message: "Phone number is required" }),
    address: zod_1.z.string().min(1, { message: "Address is required" }),
    type: zod_1.z.string().min(1, { message: "Type of service is required" }),
});
