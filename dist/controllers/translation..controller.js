"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationController = void 0;
class TranslationController {
    constructor(prisma) {
        this.prisma = prisma;
        // Listar todas as traduções
        this.index = async (req, res) => {
            try {
                const translations = await this.prisma.translation.findMany();
                res.json(translations);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar traduções' });
            }
        };
        // Buscar tradução por ID
        this.show = async (req, res) => {
            const id = Number(req.params.id);
            try {
                const translation = await this.prisma.translation.findUnique({
                    where: { id },
                });
                if (!translation) {
                    res.status(404).json({ error: 'Tradução não encontrada' });
                    return;
                }
                res.json(translation);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar tradução' });
            }
        };
        // Criar nova tradução
        this.create = async (req, res) => {
            const { key, en, es, pt, fr } = req.body;
            try {
                const translation = await this.prisma.translation.create({
                    data: { key, en, es, pt, fr },
                });
                res.status(201).json(translation);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao criar tradução' });
            }
        };
        // Atualizar tradução existente
        this.update = async (req, res) => {
            const id = Number(req.params.id);
            const { key, en, es, pt, fr } = req.body;
            try {
                const updatedTranslation = await this.prisma.translation.update({
                    where: { id },
                    data: { key, en, es, pt, fr },
                });
                res.json(updatedTranslation);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao atualizar tradução' });
            }
        };
        // Deletar tradução
        this.delete = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.prisma.translation.delete({ where: { id } });
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao deletar tradução' });
            }
        };
    }
}
exports.TranslationController = TranslationController;
