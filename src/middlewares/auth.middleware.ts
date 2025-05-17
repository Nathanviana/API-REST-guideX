import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  userType: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

    if (!token) {
      res.status(401).json({ error: "Token not provided" });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ error: "Invalid token" });
        return;
      }

      req.user = decoded as JwtPayload;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error during token validation" });
  }
}

