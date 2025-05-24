import { Router, type RequestHandler } from "express";
import { UserController } from "../../controllers/user.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createUserSchema } from "../../dtos/user.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";
import { authenticateToken } from "../../middlewares/auth.middleware";

export const userRoutes = Router();
const controller = new UserController(prisma);

userRoutes.get("/", controller.index.bind(controller) as RequestHandler);

userRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);

userRoutes.post(
  "/",
  validate(createUserSchema),
  controller.register.bind(controller) as RequestHandler
);

userRoutes.put(
  "/:id",
  validate(createUserSchema),
  controller.update.bind(controller) as RequestHandler
);

userRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);

userRoutes.patch(
  "/:id/status",
  authenticateToken,
  authorizeAccess(["admin"]),
  controller.updateStatus.bind(controller) as RequestHandler
);

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
