import { Router, type RequestHandler } from "express";
import { StudentController } from "../../controllers/student.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createFeedbackSchema } from "../../dtos/feedback.dto";

export const feedbackRoutes = Router();
const controller = new StudentController(prisma);

feedbackRoutes.get("/", controller.index.bind(controller) as RequestHandler);
feedbackRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
feedbackRoutes.post(
  "/",
  validate(createFeedbackSchema),
  controller.create.bind(controller) as RequestHandler,
);
feedbackRoutes.put(
  "/:id",
  validate(createFeedbackSchema),
  controller.update.bind(controller) as RequestHandler,
);
feedbackRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);