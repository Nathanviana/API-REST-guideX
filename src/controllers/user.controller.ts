import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret"; // Guarde essa variável no .env!

export class UserController {
  constructor(private prisma: PrismaClient) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    try {
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: "Email already in use" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  };
}
