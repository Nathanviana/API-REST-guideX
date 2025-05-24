import { Router, type RequestHandler } from "express";
import { TranslationController } from "../../controllers/translation..controller";
import { prisma } from "../../factories/prisma.factory";
import { validate } from "../../middlewares/validator.middleware";
import { createTranslationSchema } from "../../dtos/translation.dto";

export const translationRoutes = Router();
const controller = new TranslationController(prisma);

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

translationRoutes.get("/", controller.index.bind(controller) as RequestHandler);
translationRoutes.get("/:id", controller.show.bind(controller) as RequestHandler);
translationRoutes.post(
  "/",
  validate(createTranslationSchema),
  controller.create.bind(controller) as RequestHandler,
);
translationRoutes.put(
  "/:id",
  validate(createTranslationSchema),
  controller.update.bind(controller) as RequestHandler,
);
translationRoutes.delete("/:id", controller.delete.bind(controller) as RequestHandler);