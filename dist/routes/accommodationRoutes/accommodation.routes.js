"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accommodationRoutes = void 0;
const express_1 = require("express");
const accommodation_controller_1 = require("../../controllers/accommodation.controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const accommodation_dto_1 = require("../../dtos/accommodation.dto");
const role_middleware_1 = require("../../middlewares/role.middleware");
exports.accommodationRoutes = (0, express_1.Router)();
const controller = new accommodation_controller_1.AccommodationController(prisma_factory_1.prisma);
exports.accommodationRoutes.get("/", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal", "student"]), controller.index.bind(controller));
exports.accommodationRoutes.get("/:id", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal", "student"]), controller.show.bind(controller));
exports.accommodationRoutes.post("/", (0, role_middleware_1.authorizeAccess)(["admin"]), (0, validator_middleware_1.validate)(accommodation_dto_1.createAccommodationSchema), controller.create.bind(controller));
exports.accommodationRoutes.put("/:id", (0, role_middleware_1.authorizeAccess)(["admin"]), (0, validator_middleware_1.validate)(accommodation_dto_1.createAccommodationSchema), controller.update.bind(controller));
exports.accommodationRoutes.delete("/:id", (0, role_middleware_1.authorizeAccess)(["admin"]), controller.delete.bind(controller));
/**
 * @openapi
 * /accommodations:
 *   get:
 *     summary: Lista todas as acomodações
 *     tags:
 *       - Acomodações
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de acomodações
 *   post:
 *     summary: Cria uma nova acomodação
 *     tags:
 *       - Acomodações
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Accommodation'
 *           example:
 *             name: "Hotel Central"
 *             address: "Rua das Flores, 123"
 *             description: "Acomodação confortável no centro da cidade."
 *             availability: true
 *     responses:
 *       201:
 *         description: Acomodação criada
 *       400:
 *         description: Dados inválidos
 *
 * /accommodations/{id}:
 *   get:
 *     summary: Busca uma acomodação por ID
 *     tags:
 *       - Acomodações
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
 *         description: Dados da acomodação
 *       404:
 *         description: Acomodação não encontrada
 *   put:
 *     summary: Atualiza uma acomodação
 *     tags:
 *       - Acomodações
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
 *             $ref: '#/components/schemas/Accommodation'
 *     responses:
 *       200:
 *         description: Acomodação atualizada
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Acomodação não encontrada
 *   delete:
 *     summary: Remove uma acomodação
 *     tags:
 *       - Acomodações
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
 *         description: Acomodação removida
 *       404:
 *         description: Acomodação não encontrada
 */ 
