"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const express_1 = require("express");
const event_controller_1 = require("../../controllers/event.controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const event_dto_1 = require("../../dtos/event.dto");
const role_middleware_1 = require("../../middlewares/role.middleware");
exports.eventRoutes = (0, express_1.Router)();
const controller = new event_controller_1.EventController(prisma_factory_1.prisma);
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
exports.eventRoutes.get("/", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal", "student"]), controller.index.bind(controller));
exports.eventRoutes.get("/:id", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal", "student"]), controller.show.bind(controller));
exports.eventRoutes.post("/", (0, role_middleware_1.authorizeAccess)(["admin"], ["normal"]), (0, validator_middleware_1.validate)(event_dto_1.createEventSchema), controller.create.bind(controller));
exports.eventRoutes.put("/:id", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal"]), (0, validator_middleware_1.validate)(event_dto_1.createEventSchema), controller.update.bind(controller));
exports.eventRoutes.delete("/:id", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal"]), controller.delete.bind(controller));
