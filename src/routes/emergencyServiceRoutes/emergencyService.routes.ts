import { Router, type RequestHandler } from "express";
import { EmergencyServiceController } from "../../controllers/emergencyService.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createEmergencyServiceSchema } from "../../dtos/emergencyService.dto";

export const emergencyServiceRoutes = Router();
const controller = new EmergencyServiceController(prisma);

emergencyServiceRoutes.get("/", controller.index.bind(controller) as RequestHandler);
emergencyServiceRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
emergencyServiceRoutes.post(
  "/",
  validate(createEmergencyServiceSchema),
  controller.create.bind(controller) as RequestHandler,
);
emergencyServiceRoutes.put(
  "/:id",
  validate(createEmergencyServiceSchema),
  controller.update.bind(controller) as RequestHandler,
);
emergencyServiceRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);