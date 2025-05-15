import { PrismaClient, Event } from '@prisma/client';
import { Request, Response } from 'express';

export class EventController {
  constructor(private prisma: PrismaClient) {}

  index = async (req: Request, res: Response): Promise<void> => {
    const events = await this.prisma.event.findMany();
    res.json(events);
  };

  show = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json(event);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { name, description, startDate, endDate, location } = req.body;

    try {
      const event = await this.prisma.event.create({
        data: { name, description, startDate, endDate, location },
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error creating event' });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { name, description, startDate, endDate, location } = req.body;

    try {
      const updatedEvent = await this.prisma.event.update({
        where: { id },
        data: { name, description, startDate, endDate, location },
      });
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Error updating event' });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.prisma.event.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting event' });
    }
  };
}
