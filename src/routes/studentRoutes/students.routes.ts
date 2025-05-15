import { Router, type RequestHandler } from "express";
import { StudentController } from "../../controllers/studentController";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createStudentSchema } from "../../dtos/student.dto";

export const studentRoutes = Router();
const controller = new StudentController(prisma);

studentRoutes.get("/", controller.index.bind(controller) as RequestHandler);
studentRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
studentRoutes.post(
  "/",
  validate(createStudentSchema),
  controller.create.bind(controller) as RequestHandler,
);
studentRoutes.put(
  "/:id",
  validate(createStudentSchema),
  controller.update.bind(controller) as RequestHandler,
);
studentRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);
