"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user.controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const user_dto_1 = require("../../dtos/user.dto");
const role_middleware_1 = require("../../middlewares/role.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
exports.userRoutes = (0, express_1.Router)();
const controller = new user_controller_1.UserController(prisma_factory_1.prisma);
exports.userRoutes.get("/", controller.index.bind(controller));
exports.userRoutes.get("/:id", controller.show.bind(controller));
exports.userRoutes.post("/", (0, validator_middleware_1.validate)(user_dto_1.createUserSchema), controller.register.bind(controller));
exports.userRoutes.put("/:id", (0, validator_middleware_1.validate)(user_dto_1.createUserSchema), controller.update.bind(controller));
exports.userRoutes.delete("/:id", controller.delete.bind(controller));
exports.userRoutes.patch("/:id/status", auth_middleware_1.authenticateToken, (0, role_middleware_1.authorizeAccess)(["admin"]), controller.updateStatus.bind(controller));
/**
 * @openapi
 * /users:
 *   get:
 *    summary: Lista todos os usuários
 *    tags:
 *     - Usuários
 *    responses:
 *     200:
 *      description: Lista de usuários
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "João Silva"
 *             email: "joao@email.com"
 *             password: "senha123"
 *             role: "user"
 *             userType: "student"
 *     responses:
 *       201:
 *         description: Usuário registrado
 *       400:
 *         description: Dados inválidos
 *
 * /users/{id}/status:
 *   patch:
 *     summary: Ativa ou desativa um usuário
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status do usuário alterado
 *       404:
 *         description: Usuário não encontrado
 * /users/{id}:
 *   put:
 *    summary: Atualiza um usuário
 *    tags:
  *    - Usuários
  *   security:
  *    - bearerAuth: []
  *   parameters:
  *    - in: path
  *      name: id
  *      required: true
  *      schema:
  *        type: integer
  *   responses:
  *    200:
  *      description: Usuário atualizado
  *    400:
  *      description: Dados inválidos
  *    404:
  *      description: Usuário não encontrado
 *   delete:
 *    summary: Remove um usuário
 *    tags:
 *      - Usuários
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *           type: integer
 *    responses:
 *      204:
 *        description: Usuário removido
 *      404:
 *        description: Usuário não encontrado
 *      401:
 *        description: Não autorizado
 *      403:
 *        description: Acesso negado
 *      500:
 *        description: Erro interno do servidor
 */
