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

      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  };

  // Endpoint para refresh do token
  refreshAccessToken = async (req: Request, res: Response): Promise<void>  => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    try {
      // Verificando se o refresh token é válido
      jwt.verify(refreshToken, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          res.status(403).json({ error: "Invalid or expired refresh token" });
          return;
        }

        // Gerar novo access token
        const newAccessToken = jwt.sign(
          { userId: decoded.userId, email: decoded.email, role: decoded.role, userType: decoded.userType },
          JWT_SECRET,
          { expiresIn: "1h" } // Novo access token válido por 1 hora
        );

        res.json({ accessToken: newAccessToken });
      });
    } catch (error) {
      res.status(500).json({ error: "Error refreshing access token" });
    }
  };
}
