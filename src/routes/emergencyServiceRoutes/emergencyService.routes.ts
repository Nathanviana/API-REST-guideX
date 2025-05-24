import { Router, type RequestHandler } from "express";
import { EmergencyServiceController } from "../../controllers/emergencyService.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createEmergencyServiceSchema } from "../../dtos/emergencyService.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const emergencyServiceRoutes = Router();
const controller = new EmergencyServiceController(prisma);

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

emergencyServiceRoutes.get(
  "/",
  authorizeAccess(["admin", "user"], ["normal" ,"student"]),
  controller.index.bind(controller) as RequestHandler);

emergencyServiceRoutes.get(
  "/:id",
  authorizeAccess(["admin", "user"], ["normal" ,"student"]),
  controller.show.bind(controller) as RequestHandler);

emergencyServiceRoutes.post(
  "/",
  authorizeAccess(["admin"]),
  validate(createEmergencyServiceSchema),
  controller.create.bind(controller) as RequestHandler,
);

emergencyServiceRoutes.put(
  "/:id",
  authorizeAccess(["admin"]),
  validate(createEmergencyServiceSchema),
  controller.update.bind(controller) as RequestHandler,
);
emergencyServiceRoutes.delete(
  "/:id",
  authorizeAccess(["admin"]),
  controller.delete.bind(controller) as RequestHandler);