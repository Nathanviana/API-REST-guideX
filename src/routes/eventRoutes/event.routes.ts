import { Router, type RequestHandler } from "express";
import { EventController } from "../../controllers/event.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createEventSchema } from "../../dtos/event.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const eventRoutes = Router();
const controller = new EventController(prisma);

eventRoutes.get(
  "/",
  authorizeAccess(["admin", "user"], ["normal", "student"]),
  controller.index.bind(controller) as RequestHandler);

eventRoutes.get(
  "/:id",
  authorizeAccess(["admin", "user"], ["normal", "student"]),
  controller.show.bind(controller) as RequestHandler);

eventRoutes.post(
  "/",
  authorizeAccess(["admin, user"], ["normal"]),
  validate(createEventSchema),
  controller.create.bind(controller) as RequestHandler,
);

eventRoutes.put(
  "/:id",
  authorizeAccess(["admin, user"], ["normal"]),
  validate(createEventSchema),
  controller.update.bind(controller) as RequestHandler,
);

eventRoutes.delete(
  "/:id",
  authorizeAccess(["admin, user"], ["normal"]),
  controller.delete.bind(controller) as RequestHandler);