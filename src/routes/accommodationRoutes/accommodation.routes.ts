import { Router, type RequestHandler } from "express";
import { AccommodationController } from "../../controllers/accommodation.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createAccommodationSchema } from "../../dtos/accommodation.dto";

export const accommodationRoutes = Router();
const controller = new AccommodationController(prisma);

accommodationRoutes.get("/", controller.index.bind(controller) as RequestHandler);
accommodationRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
accommodationRoutes.post(
  "/",
  validate(createAccommodationSchema),
  controller.create.bind(controller) as RequestHandler,
);
accommodationRoutes.put(
  "/:id",
  validate(createAccommodationSchema),
  controller.update.bind(controller) as RequestHandler,
);
accommodationRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);