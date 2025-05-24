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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *           example:
 *             email: "joao@email.com"
 *             password: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *
 * /auth/refresh:
 *   post:
 *     summary: Gera novo access token a partir do refresh token
 *     tags:
 *       - Autenticação
 *     responses:
 *       200:
 *         description: Access token renovado
 *       400:
 *         description: Refresh token ausente
 *       403:
 *         description: Refresh token inválido ou expirado
 *
 * /auth/logout:
 *   post:
 *     summary: Realiza logout do usuário
 *     tags:
 *       - Autenticação
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */