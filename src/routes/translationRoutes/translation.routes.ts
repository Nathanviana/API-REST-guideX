import { Router, type RequestHandler } from "express";
import { StudentController } from "../../controllers/student.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createTranslationSchema } from "../../dtos/translation.dto";

export const translationRoutes = Router();
const controller = new StudentController(prisma);

translationRoutes.get("/", controller.index.bind(controller) as RequestHandler);
translationRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
translationRoutes.post(
  "/",
  validate(createTranslationSchema),
  controller.create.bind(controller) as RequestHandler,
);
translationRoutes.put(
  "/:id",
  validate(createTranslationSchema),
  controller.update.bind(controller) as RequestHandler,
);
translationRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);