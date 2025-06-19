"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emergencyServiceRoutes = void 0;
const express_1 = require("express");
const emergencyService_controller_1 = require("../../controllers/emergencyService.controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const emergencyService_dto_1 = require("../../dtos/emergencyService.dto");
const role_middleware_1 = require("../../middlewares/role.middleware");
exports.emergencyServiceRoutes = (0, express_1.Router)();
const controller = new emergencyService_controller_1.EmergencyServiceController(prisma_factory_1.prisma);
/**
 * @openapi
 * /emergency-services:
 *   get:
 *     summary: Lista todos os serviços de emergência
 *     tags:
 *       - Serviços de Emergência
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços de emergência
 *   post:
 *     summary: Cria um novo serviço de emergência
 *     tags:
 *       - Serviços de Emergência
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmergencyService'
 *           example:
 *             serviceName: "Hospital Municipal"
 *             phoneNumber: "(11) 99999-9999"
 *             address: "Av. Saúde, 456"
 *             type: "Hospital"
 *     responses:
 *       201:
 *         description: Serviço criado
 *       400:
 *         description: Dados inválidos
 *
 * /emergency-services/{id}:
 *   get:
 *     summary: Busca um serviço de emergência por ID
 *     tags:
 *       - Serviços de Emergência
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
 *         description: Dados do serviço
 *       404:
 *         description: Serviço não encontrado
 *   put:
 *     summary: Atualiza um serviço de emergência
 *     tags:
 *       - Serviços de Emergência
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
 *             $ref: '#/components/schemas/EmergencyService'
 *     responses:
 *       200:
 *         description: Serviço atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Serviço não encontrado
 *   delete:
 *     summary: Remove um serviço de emergência
 *     tags:
 *       - Serviços de Emergência
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
 *         description: Serviço removido
 *       404:
 *         description: Serviço não encontrado
 */
exports.emergencyServiceRoutes.get("/", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal", "student"]), controller.index.bind(controller));
exports.emergencyServiceRoutes.get("/:id", (0, role_middleware_1.authorizeAccess)(["admin", "user"], ["normal", "student"]), controller.show.bind(controller));
exports.emergencyServiceRoutes.post("/", (0, role_middleware_1.authorizeAccess)(["admin"]), (0, validator_middleware_1.validate)(emergencyService_dto_1.createEmergencyServiceSchema), controller.create.bind(controller));
exports.emergencyServiceRoutes.put("/:id", (0, role_middleware_1.authorizeAccess)(["admin"]), (0, validator_middleware_1.validate)(emergencyService_dto_1.createEmergencyServiceSchema), controller.update.bind(controller));
exports.emergencyServiceRoutes.delete("/:id", (0, role_middleware_1.authorizeAccess)(["admin"]), controller.delete.bind(controller));
