import { PrismaClient, Translation } from '@prisma/client';
import { Request, Response } from 'express';

export class TranslationController {
  constructor(private prisma: PrismaClient) {}

  // Listar todas as traduções
  index = async (req: Request, res: Response): Promise<void> => {
    try {
      const translations = await this.prisma.translation.findMany();
      res.json(translations);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar traduções' });
    }
  };

  // Buscar tradução por ID
  show = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const translation = await this.prisma.translation.findUnique({
        where: { id },
      });
      if (!translation) {
        res.status(404).json({ error: 'Tradução não encontrada' });
        return;
      }
      res.json(translation);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar tradução' });
    }
  };

  // Criar nova tradução
  create = async (req: Request, res: Response): Promise<void> => {
    const { key, en, es, pt, fr } = req.body;
    try {
      const translation = await this.prisma.translation.create({
        data: { key, en, es, pt, fr },
      });
      res.status(201).json(translation);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tradução' });
    }
  };

  // Atualizar tradução existente
  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { key, en, es, pt, fr } = req.body;
    try {
      const updatedTranslation = await this.prisma.translation.update({
        where: { id },
        data: { key, en, es, pt, fr },
      });
      res.json(updatedTranslation);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar tradução' });
    }
  };

  // Deletar tradução
  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      await this.prisma.translation.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar tradução' });
    }
  };
}
