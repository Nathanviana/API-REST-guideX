"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translationRoutes = void 0;
const express_1 = require("express");
const translation__controller_1 = require("../../controllers/translation..controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const translation_dto_1 = require("../../dtos/translation.dto");
exports.translationRoutes = (0, express_1.Router)();
const controller = new translation__controller_1.TranslationController(prisma_factory_1.prisma);
/**
 * @openapi
 * /translations:
 *   get:
 *     summary: Lista todas as traduções
 *     tags:
 *       - Traduções
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de traduções
 *   post:
 *     summary: Cria uma nova tradução
 *     tags:
 *       - Traduções
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Translation'
 *           example:
 *             key: "welcome_message"
 *             value: "Bem-vindo ao sistema!"
 *             language: "pt-BR"
 *     responses:
 *       201:
 *         description: Tradução criada
 *       400:
 *         description: Dados inválidos
 *
 * /translations/{id}:
 *   get:
 *     summary: Busca uma tradução por ID
 *     tags:
 *       - Traduções
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
 *         description: Dados da tradução
 *       404:
 *         description: Tradução não encontrada
 *   put:
 *     summary: Atualiza uma tradução
 *     tags:
 *       - Traduções
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
 *             $ref: '#/components/schemas/Translation'
 *     responses:
 *       200:
 *         description: Tradução atualizada
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Tradução não encontrada
 *   delete:
 *     summary: Remove uma tradução
 *     tags:
 *       - Traduções
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
 *         description: Tradução removida
 *       404:
 *         description: Tradução não encontrada
 */
exports.translationRoutes.get("/", controller.index.bind(controller));
exports.translationRoutes.get("/:id", controller.show.bind(controller));
exports.translationRoutes.post("/", (0, validator_middleware_1.validate)(translation_dto_1.createTranslationSchema), controller.create.bind(controller));
exports.translationRoutes.put("/:id", (0, validator_middleware_1.validate)(translation_dto_1.createTranslationSchema), controller.update.bind(controller));
exports.translationRoutes.delete("/:id", controller.delete.bind(controller));
