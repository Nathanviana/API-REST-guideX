import { Router, type RequestHandler } from "express";
import { EventController } from "../../controllers/event.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createEventSchema } from "../../dtos/event.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const eventRoutes = Router();
const controller = new EventController(prisma);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Lista todos os eventos
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos
 *   post:
 *     summary: Cria um novo evento
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *           example:
 *             name: "Feira de Profissões"
 *             description: "Evento para apresentação de cursos."
 *             startDate: "2025-06-15T09:00:00Z"
 *             endDate: "2025-06-15T17:00:00Z"
 *             location: "Auditório Principal"
 *     responses:
 *       201:
 *         description: Evento criado
 *       400:
 *         description: Dados inválidos
 *
 * /events/{id}:
 *   get:
 *     summary: Busca um evento por ID
 *     tags:
 *       - Eventos
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
 *         description: Dados do evento
 *       404:
 *         description: Evento não encontrado
 *   put:
 *     summary: Atualiza um evento
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Evento não encontrado
 *   delete:
 *     summary: Remove um evento
 *     tags:
 *       - Eventos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento removido
 *       404:
 *         description: Evento não encontrado
 */

eventRoutes.get(
  "/",
  authorizeAccess(["admin", "user"], ["normal", "student"]),
  controller.index.bind(controller) as RequestHandler);

eventRoutes.get(
  "/:id",
  authorizeAccess(["admin", "user"], ["normal", "student"]),
  controller.show.bind(controller) as RequestHandler);

eventRoutes.post(
  "/",
  authorizeAccess(["admin"], ["normal"]),
  validate(createEventSchema),
  controller.create.bind(controller) as RequestHandler,
);

eventRoutes.put(
  "/:id",
  authorizeAccess(["admin", "user"], ["normal"]),
  validate(createEventSchema),
  controller.update.bind(controller) as RequestHandler,
);

eventRoutes.delete(
  "/:id",
  authorizeAccess(["admin", "user"], ["normal"]),
  controller.delete.bind(controller) as RequestHandler);