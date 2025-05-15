import { Router, type RequestHandler } from "express";
import { StudentController } from "../../controllers/student.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createEventSchema } from "../../dtos/event.dto";

export const eventRoutes = Router();
const controller = new StudentController(prisma);

eventRoutes.get("/", controller.index.bind(controller) as RequestHandler);
eventRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
eventRoutes.post(
  "/",
  validate(createEventSchema),
  controller.create.bind(controller) as RequestHandler,
);
eventRoutes.put(
  "/:id",
  validate(createEventSchema),
  controller.update.bind(controller) as RequestHandler,
);
eventRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);