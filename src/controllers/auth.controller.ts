// src/controllers/auth.controller.ts

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AuthService, JwtPayload } from "../services/auth.service";

const prisma = new PrismaClient();

export class AuthController {
  constructor(private prisma: PrismaClient) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const isValid = await AuthService.comparePassword(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const payload: JwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        userType: user.userType,
      };

      const accessToken = AuthService.generateAccessToken(payload);
      const refreshToken = AuthService.generateRefreshToken(payload);

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
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  };

  refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    try {
      const decoded = AuthService.verifyToken(refreshToken);

      const newAccessToken = AuthService.generateAccessToken(decoded);

      res
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 1000,
          sameSite: "strict",
        })
        .json({ message: "Access token refreshed" });
    } catch (error) {
      res.status(403).json({ error: "Invalid or expired refresh token" });
    }
  };

  logout = (req: Request, res: Response): void => {
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