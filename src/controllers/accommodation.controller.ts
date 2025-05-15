import { PrismaClient, Accommodation } from '@prisma/client';
import { Request, Response } from 'express';

export class AccommodationController {
  constructor(private prisma: PrismaClient) {}

  index = async (req: Request, res: Response): Promise<void> => {
    const accommodations = await this.prisma.accommodation.findMany();
    res.json(accommodations);
  };

  show = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const accommodation = await this.prisma.accommodation.findUnique({
      where: { id },
    });

    if (!accommodation) {
      res.status(404).json({ error: 'Accommodation not found' });
      return;
    }
    res.json(accommodation);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { name, address, description, availability } = req.body;

    try {
      const accommodation = await this.prisma.accommodation.create({
        data: { name, address, description, availability },
      });
      res.status(201).json(accommodation);
    } catch (error) {
      res.status(500).json({ error: 'Error creating accommodation' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { name, address, description, availability } = req.body;

    try {
      const updatedAccommodation = await this.prisma.accommodation.update({
        where: { id },
        data: { name, address, description, availability },
      });
      res.json(updatedAccommodation);
    } catch (error) {
      res.status(500).json({ error: 'Error updating accommodation' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.prisma.accommodation.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting accommodation' });
    }
  };
}
