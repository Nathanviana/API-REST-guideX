// src/controllers/dashboard.controller.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class DashboardController {
  constructor(private prisma: PrismaClient) {}

  summary = async (req: Request, res: Response) => {
    try {
      const [
        totalUsers,
        totalAccommodations,
        availableAccommodations,
        totalEvents,
        totalEmergencyServices,
      ] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.accommodation.count(),
        this.prisma.accommodation.count({ where: { availability: true } }),
        this.prisma.event.count(),
        this.prisma.emergencyService.count(),
      ]);

      res.json({
        totalUsers,
        totalAccommodations,
        availableAccommodations,
        occupiedAccommodations: totalAccommodations - availableAccommodations,
        totalEvents,
        totalEmergencyServices,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar resumo do dashboard" });
    }
  };

  recentActivities = async (req: Request, res: Response) => {
    try {
      const [recentAccommodations, recentEvents, recentEmergencyServices, recentUsers] =
        await Promise.all([
          this.prisma.accommodation.findMany({
            orderBy: { createdAt: "desc" },
            take: 3,
          }),
          this.prisma.event.findMany({
            orderBy: { createdAt: "desc" },
            take: 3,
          }),
          this.prisma.emergencyService.findMany({
            orderBy: { createdAt: "desc" },
            take: 3,
          }),
          this.prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            take: 3,
          }),
        ]);

      res.json({
        accommodations: recentAccommodations,
        events: recentEvents,
        emergencyServices: recentEmergencyServices,
        users: recentUsers,
      });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar atividades recentes" });
    }
  };
}
