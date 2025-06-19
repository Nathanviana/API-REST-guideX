"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = require("express");
const feedback_controller_1 = require("../../controllers/feedback.controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const feedback_dto_1 = require("../../dtos/feedback.dto");
exports.feedbackRoutes = (0, express_1.Router)();
const controller = new feedback_controller_1.FeedbackController(prisma_factory_1.prisma);
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
exports.feedbackRoutes.get("/", controller.index.bind(controller));
exports.feedbackRoutes.get("/:id", controller.show.bind(controller));
exports.feedbackRoutes.post("/", (0, validator_middleware_1.validate)(feedback_dto_1.createFeedbackSchema), controller.create.bind(controller));
exports.feedbackRoutes.put("/:id", (0, validator_middleware_1.validate)(feedback_dto_1.createFeedbackSchema), controller.update.bind(controller));
exports.feedbackRoutes.delete("/:id", controller.delete.bind(controller));
