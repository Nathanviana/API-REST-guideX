import { PrismaClient, Feedback } from "@prisma/client";
import { Request, Response } from "express";

export class FeedbackController {
  constructor(private prisma: PrismaClient) {}

  index = async (req: Request, res: Response): Promise<void> => {
    try {
      const feedbacks = await this.prisma.feedback.findMany();
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar feedbacks" });
    }
  };

  show = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const feedback = await this.prisma.feedback.findUnique({
        where: { id },
      });

      if (!feedback) {
        res.status(404).json({ error: "Feedback não encontrado" });
        return;
      }

      res.json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar feedback" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { studentId, accommodationRating, eventRating, comments } = req.body;

    try {
      const feedback = await this.prisma.feedback.create({
        data: {
          studentId,
          accommodationRating,
          eventRating,
          comments,
        },
      });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar feedback" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { studentId, accommodationRating, eventRating, comments } = req.body;

    try {
      const updatedFeedback = await this.prisma.feedback.update({
        where: { id },
        data: {
          studentId,
          accommodationRating,
          eventRating,
          comments,
        },
      });
      res.json(updatedFeedback);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar feedback" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.prisma.feedback.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar feedback" });
    }
  };
}
