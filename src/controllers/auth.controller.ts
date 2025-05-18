// src/controllers/auth.controller.ts

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthController {
  constructor(private prisma: PrismaClient) {}

  // Login e geração de JWT
  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      // Verificando se o usuário existe
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Verificando se a senha está correta
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Gerando o access token JWT
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role, userType: user.userType },
        JWT_SECRET,
        { expiresIn: "1h" } // Expira em 1 hora
      );

      // Gerando o refresh token
      const refreshToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role, userType: user.userType },
        JWT_SECRET,
        { expiresIn: "30d" } // Expira em 30 dias
      );

    // Aqui você envia os tokens no cookie HTTP-only
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, // 1 hora
        sameSite: "strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
        sameSite: "strict",
      })
      .json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
  };

  // Endpoint para refresh do token
  refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
    return;
  }

  jwt.verify(refreshToken, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ error: "Invalid or expired refresh token" });
      return;
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email, role: decoded.role, userType: decoded.userType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({ message: "Access token refreshed" });
  });
};


  // Logout
  logout = (req: Request, res: Response): void => {
    res
      .clearCookie("accessToken", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" })
      .clearCookie("refreshToken", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production" })
      .status(200)
      .json({ message: "Logged out successfully" });
  };
}
