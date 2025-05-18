import { Router, type RequestHandler } from "express";
import { EmergencyServiceController } from "../../controllers/emergencyService.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createEmergencyServiceSchema } from "../../dtos/emergencyService.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const emergencyServiceRoutes = Router();
const controller = new EmergencyServiceController(prisma);

emergencyServiceRoutes.get(
  "/",
  authorizeAccess(["admin", "user"], ["normal" ,"student"]),
  controller.index.bind(controller) as RequestHandler);

emergencyServiceRoutes.get(
  "/:id",
  authorizeAccess(["admin", "user"], ["normal" ,"student"]),
  controller.show.bind(controller) as RequestHandler);

emergencyServiceRoutes.post(
  "/",
  authorizeAccess(["admin"]),
  validate(createEmergencyServiceSchema),
  controller.create.bind(controller) as RequestHandler,
);

emergencyServiceRoutes.put(
  "/:id",
  authorizeAccess(["admin"]),
  validate(createEmergencyServiceSchema),
  controller.update.bind(controller) as RequestHandler,
);
emergencyServiceRoutes.delete(
  "/:id",
  authorizeAccess(["admin"]),
  controller.delete.bind(controller) as RequestHandler);