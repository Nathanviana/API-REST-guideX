// src/controllers/user.controller.ts

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userSchema } from "../dtos/user.dto"; // seu schema zod atualizado

export class UserController {
  static toggleUserStatus: any;
  constructor(private prisma: PrismaClient) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validação dos dados com o schema zod unificado
      const parsedData = userSchema.parse(req.body);

      // Verifica se já existe usuário com esse email
      const existingUser = await this.prisma.user.findUnique({ where: { email: parsedData.email } });
      if (existingUser) {
        res.status(400).json({ error: "Email já em uso" });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(parsedData.password, 10);

      // Criar usuário no banco com todos os campos
      const user = await this.prisma.user.create({
        data: {
          email: parsedData.email,
          password: hashedPassword,
          name: parsedData.name,
          role: parsedData.role || "user",
          userType: parsedData.userType,
          country: parsedData.country,
          university: parsedData.university,
          course: parsedData.course,
          language: parsedData.language,
        },
      });

      // Retorna dados (sem senha)
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userType: user.userType,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Erro ao criar usuário" });
      }
    }
  };

  toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const user = await this.prisma.user.findUnique({ where: { id: parseInt(id) } });

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: { isActive: !user.isActive },
      });

      res.status(200).json({
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        userType: updatedUser.userType,
        isActive: updatedUser.isActive,
      });
    } catch (error: any) {
      res.status(500).json({ error: "Erro ao atualizar status do usuário" });
    }
  };
}
