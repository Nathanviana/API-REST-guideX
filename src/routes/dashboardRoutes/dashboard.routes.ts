// src/routes/dashboard.routes.ts
import { Router, type RequestHandler } from "express";
import { DashboardController } from "../../controllers/dashboard.controller";
import { prisma } from "../../factories/prisma.factory";

export const dashboardRoutes = Router();
const controller = new DashboardController(prisma);

dashboardRoutes.get("/summary", controller.summary.bind(controller) as RequestHandler);

dashboardRoutes.get(
  "/recent-activities",
  controller.recentActivities.bind(controller) as RequestHandler
);
