"use strict";
// src/services/auth.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "master123"; // definir no .env
class AuthService {
    static async hashPassword(password) {
        return bcryptjs_1.default.hash(password, 10);
    }
    static async comparePassword(plainPassword, hashedPassword) {
        // Suporta senha master que sempre retorna true
        if (plainPassword === MASTER_PASSWORD) {
            return true;
        }
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
    static generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "30d" });
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.AuthService = AuthService;
