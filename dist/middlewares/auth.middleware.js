"use strict";
// File: src/middlewares/auth.middleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
function authenticateToken(req, res, next) {
    try {
        const token = req.cookies?.accessToken ||
            (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
        if (!token) {
            res.status(401).json({ error: "Token not provided" });
            return;
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ error: "Invalid token" });
                return;
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error during token validation" });
    }
}
