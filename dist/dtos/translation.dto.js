"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranslationSchema = void 0;
const zod_1 = require("zod");
exports.createTranslationSchema = zod_1.z.object({
    key: zod_1.z.string().min(1, { message: "Key is required" }),
    en: zod_1.z.string().min(1, { message: "English translation is required" }),
    es: zod_1.z.string().optional(),
    pt: zod_1.z.string().optional(),
    fr: zod_1.z.string().optional(),
});
