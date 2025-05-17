// File: src/routes/authRoutes/auth.routes.ts

import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller";
import { validate } from "../../middlewares/validator.middleware";
import { createUserSchema } from "../../dtos/user.dto"; // Você pode criar um DTO de login se necessário
import { prisma } from "../../factories/prisma.factory";


const router = Router();
const controller = new AuthController(prisma);

router.post("/login", validate(createUserSchema), controller.login);
router.post("/refresh", controller.refreshAccessToken); // Rota para refresh do token

export { router as authRoutes };