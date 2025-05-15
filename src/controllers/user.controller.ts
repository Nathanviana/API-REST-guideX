// src/controllers/user.controller.ts

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export class UserController {
  constructor(private prisma: PrismaClient) {}

  // Registro de novo usuário
  create = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    try {
      // Verificar se o usuário já existe
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: "Email já em uso" });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar novo usuário
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  };

  // Listar todos os usuários
  index = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  };

  // Obter detalhes de um usuário específico
  show = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter usuário" });
    }
  };

  // Atualizar informações de um usuário
  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email, name } = req.body;

    try {
      const user = await this.prisma.user.update({
        where: { id: Number(id) },
        data: { email, name },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  };

  // Deletar um usuário
  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      await this.prisma.user.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  };
}
