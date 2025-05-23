import { Router, type RequestHandler } from "express";
import { UserController } from "../../controllers/user.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createUserSchema } from "../../dtos/user.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const userRoutes = Router();
const controller = new UserController(prisma);

userRoutes.get("/", controller.index.bind(controller) as RequestHandler);
// userRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
userRoutes.post(
  "/",
  validate(createUserSchema),
  controller.register.bind(controller) as RequestHandler
);
// userRoutes.put(
//   "/:id",
//   validate(createUserSchema),
//   controller.update.bind(controller) as RequestHandler
// );
// userRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);
userRoutes.patch(
  "/:id/status",
   authorizeAccess(["admin"]),
   controller.update.bind(controller) as RequestHandler
);
