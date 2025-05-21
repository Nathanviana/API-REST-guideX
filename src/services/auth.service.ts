// src/services/auth.service.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "master123"; // definir no .env

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  userType: string;
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    // Suporta senha master que sempre retorna true
    if (plainPassword === MASTER_PASSWORD) {
      return true;
    }
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  }

  static generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
  }

  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  }
}
