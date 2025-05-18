// File: src/routes/authRoutes/auth.routes.ts

import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller";
import { validate } from "../../middlewares/validator.middleware";
import { loginSchema } from "../../dtos/login.dto"; // Você pode criar um DTO de login se necessário
import { prisma } from "../../factories/prisma.factory";


const router = Router();
const controller = new AuthController(prisma);

router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", controller.refreshAccessToken); // Rota para refresh do token
router.post("/logout", controller.logout); // Rota para logout

export { router as authRoutes };