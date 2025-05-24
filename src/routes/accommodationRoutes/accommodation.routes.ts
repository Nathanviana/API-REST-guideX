import { Router, type RequestHandler } from "express";
import { AccommodationController } from "../../controllers/accommodation.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createAccommodationSchema } from "../../dtos/accommodation.dto";
import { authorizeAccess } from "../../middlewares/role.middleware";

export const accommodationRoutes = Router();
const controller = new AccommodationController(prisma);

accommodationRoutes.get(
  "/",
  authorizeAccess(["admin", "user"], ["normal", "student"]),
  controller.index.bind(controller) as RequestHandler
);

accommodationRoutes.get("/:id", authorizeAccess(["admin", "user"], ["normal", "student"]), controller.show.bind(controller) as RequestHandler);

accommodationRoutes.post(
  "/",
  authorizeAccess(["admin"]),
  validate(createAccommodationSchema),
  controller.create.bind(controller) as RequestHandler,
);

accommodationRoutes.put(
  "/:id",
  authorizeAccess(["admin"]),
  validate(createAccommodationSchema),
  controller.update.bind(controller) as RequestHandler,
);

accommodationRoutes.delete(
  "/:id",
  authorizeAccess(["admin"]),
  controller.delete.bind(controller) as RequestHandler,
);

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