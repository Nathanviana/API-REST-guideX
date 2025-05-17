import { Router, type RequestHandler } from "express";
import { AccommodationController } from "../../controllers/accommodation.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createAccommodationSchema } from "../../dtos/accommodation.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const accommodationRoutes = Router();
const controller = new AccommodationController(prisma);

accommodationRoutes.get(
  "/",
  authorizeAccess(["admin", "user"], ["normal", "student"]),
  controller.index.bind(controller) as RequestHandler
);

accommodationRoutes.get("/:id", authorizeAccess(["admin", "user"], ["normal", "student"]), controller.show.bind(controller) as RequestHandler);

accommodationRoutes.post(
  "/",
  authorizeAccess(["admin"]),
  validate(createAccommodationSchema),
  controller.create.bind(controller) as RequestHandler,
);

accommodationRoutes.put(
  "/:id",
  authorizeAccess(["admin"]),
  validate(createAccommodationSchema),
  controller.update.bind(controller) as RequestHandler,
);

accommodationRoutes.delete(
  "/:id",
  authorizeAccess(["admin"]),
  controller.delete.bind(controller) as RequestHandler);