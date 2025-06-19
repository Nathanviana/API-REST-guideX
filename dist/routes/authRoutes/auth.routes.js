"use strict";
// File: src/routes/authRoutes/auth.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const login_dto_1 = require("../../dtos/login.dto"); // Você pode criar um DTO de login se necessário
const prisma_factory_1 = require("../../factories/prisma.factory");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
exports.authRoutes = router;
const controller = new auth_controller_1.AuthController(prisma_factory_1.prisma);
router.post("/login", (0, validator_middleware_1.validate)(login_dto_1.loginSchema), controller.login);
router.post("/refresh", controller.refreshAccessToken); // Rota para refresh do token
router.post("/logout", controller.logout); // Rota para logout
router.get("/me", auth_middleware_1.authenticateToken, (req, res) => {
    const { userId, name, email, role } = req.user;
    res.json({ userId, name, email, role });
});
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
