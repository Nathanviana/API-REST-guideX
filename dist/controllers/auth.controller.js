"use strict";
// src/controllers/auth.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const auth_service_1 = require("../services/auth.service");
const prisma = new client_1.PrismaClient();
class AuthController {
    constructor(prisma) {
        this.prisma = prisma;
        this.login = async (req, res) => {
            const { email, password } = req.body;
            try {
                const user = await this.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    res.status(401).json({ error: "Invalid credentials" });
                    return;
                }
                const isValid = await auth_service_1.AuthService.comparePassword(password, user.password);
                if (!isValid) {
                    res.status(401).json({ error: "Invalid credentials" });
                    return;
                }
                const payload = {
                    userId: user.id,
                    name: user.name ?? "",
                    email: user.email,
                    role: user.role,
                    userType: user.userType,
                };
                const accessToken = auth_service_1.AuthService.generateAccessToken(payload);
                const refreshToken = auth_service_1.AuthService.generateRefreshToken(payload);
                res
                    .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 1000,
                    sameSite: "strict",
                })
                    .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    sameSite: "strict",
                })
                    .json({ message: "Logged in successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Error logging in" });
            }
        };
        this.refreshAccessToken = async (req, res) => {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                res.status(400).json({ error: "Refresh token is required" });
                return;
            }
            try {
                const decoded = auth_service_1.AuthService.verifyToken(refreshToken);
                const newAccessToken = auth_service_1.AuthService.generateAccessToken(decoded);
                res
                    .cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 1000,
                    sameSite: "strict",
                })
                    .json({ message: "Access token refreshed" });
            }
            catch (error) {
                res.status(403).json({ error: "Invalid or expired refresh token" });
            }
        };
        this.logout = (req, res) => {
            res
                .clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
                .clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .json({ message: "Logged out successfully" });
        };
    }
}
exports.AuthController = AuthController;
