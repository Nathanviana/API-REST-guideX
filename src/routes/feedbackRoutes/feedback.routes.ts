import { Router, type RequestHandler } from "express";
import { FeedbackController } from "../../controllers/feedback.controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createFeedbackSchema } from "../../dtos/feedback.dto";

export const feedbackRoutes = Router();
const controller = new FeedbackController(prisma);

/**
 * @openapi
 * /feedbacks:
 *   get:
 *     summary: Lista todos os feedbacks
 *     tags:
 *       - Feedbacks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de feedbacks
 *   post:
 *     summary: Cria um novo feedback
 *     tags:
 *       - Feedbacks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *           example:
 *             studentId: 2
 *             comments: "Ótimo atendimento!"
 *     responses:
 *       201:
 *         description: Feedback criado
 *       400:
 *         description: Dados inválidos
 *
 * /feedbacks/{id}:
 *   get:
 *     summary: Busca um feedback por ID
 *     tags:
 *       - Feedbacks
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
 *         description: Dados do feedback
 *       404:
 *         description: Feedback não encontrado
 *   put:
 *     summary: Atualiza um feedback
 *     tags:
 *       - Feedbacks
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
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Feedback não encontrado
 *   delete:
 *     summary: Remove um feedback
 *     tags:
 *       - Feedbacks
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
 *         description: Feedback removido
 *       404:
 *         description: Feedback não encontrado
 */

feedbackRoutes.get("/", controller.index.bind(controller) as RequestHandler);
feedbackRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
feedbackRoutes.post(
  "/",
  validate(createFeedbackSchema),
  controller.create.bind(controller) as RequestHandler,
);
feedbackRoutes.put(
  "/:id",
  validate(createFeedbackSchema),
  controller.update.bind(controller) as RequestHandler,
);
feedbackRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);