"use strict";
// src/controllers/user.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_dto_1 = require("../dtos/user.dto"); // seu schema zod atualizado
class UserController {
    constructor(prisma) {
        this.prisma = prisma;
        this.index = async (req, res) => {
            const users = await this.prisma.user.findMany();
            res.json(users);
        };
        this.show = async (req, res) => {
            const { id } = req.params;
            const user = await this.prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado" });
                return;
            }
            res.json(user);
        };
        this.register = async (req, res) => {
            try {
                // Validação dos dados com o schema zod unificado
                const parsedData = user_dto_1.userSchema.parse(req.body);
                // Verifica se já existe usuário com esse email
                const existingUser = await this.prisma.user.findUnique({
                    where: { email: parsedData.email },
                });
                if (existingUser) {
                    res.status(400).json({ error: "Email já em uso" });
                    return;
                }
                // Hash da senha
                const hashedPassword = await bcryptjs_1.default.hash(parsedData.password, 10);
                // Criar usuário no banco com todos os campos
                const user = await this.prisma.user.create({
                    data: {
                        email: parsedData.email,
                        password: hashedPassword,
                        name: parsedData.name,
                        role: parsedData.role || "user",
                        userType: parsedData.userType,
                        country: parsedData.country,
                        university: parsedData.university,
                        course: parsedData.course,
                        language: parsedData.language,
                    },
                });
                // Retorna dados (sem senha)
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    userType: user.userType,
                });
            }
            catch (error) {
                if (error.name === "ZodError") {
                    res.status(400).json({ errors: error.errors });
                }
                else {
                    res.status(500).json({ error: "Erro ao criar usuário" });
                }
            }
        };
        this.update = async (req, res) => {
            const id = Number(req.params.id);
            const { email, name, password, role, userType } = req.body;
            try {
                // Validação dos dados com o schema zod unificado
                const parsedData = user_dto_1.userSchema.parse(req.body);
                // Verifica se já existe usuário com esse email
                const existingUser = await this.prisma.user.findUnique({
                    where: { email: parsedData.email },
                });
                if (existingUser && existingUser.id !== id) {
                    res.status(400).json({ error: "Email já em uso" });
                    return;
                }
                // Hash da senha
                const hashedPassword = password ? await bcryptjs_1.default.hash(password, 10) : undefined;
                // Atualiza usuário no banco com todos os campos
                const updatedUser = await this.prisma.user.update({
                    where: { id },
                    data: {
                        email: parsedData.email,
                        password: hashedPassword,
                        name: parsedData.name,
                        role: parsedData.role || "user",
                        userType: parsedData.userType,
                        country: parsedData.country,
                        university: parsedData.university,
                        course: parsedData.course,
                        isActive: parsedData.isActive,
                    },
                });
                // Retorna dados (sem senha)
                res.status(200).json({
                    id: updatedUser.id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role,
                    userType: updatedUser.userType,
                });
            }
            catch (error) {
                if (error.name === "ZodError") {
                    res.status(400).json({ errors: error.errors });
                }
                else {
                    res.status(500).json({ error: "Erro ao atualizar usuário" });
                }
            }
        };
        this.updateStatus = async (req, res) => {
            const { id } = req.params;
            try {
                const user = await this.prisma.user.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!user) {
                    res.status(404).json({ error: "Usuário não encontrado" });
                    return;
                }
                const updatedUser = await this.prisma.user.update({
                    where: { id: parseInt(id) },
                    data: { isActive: !user.isActive },
                });
                res.status(200).json({
                    id: updatedUser.id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role,
                    userType: updatedUser.userType,
                    isActive: updatedUser.isActive,
                });
            }
            catch (error) {
                res.status(500).json({ error: "Erro ao atualizar status do usuário" });
            }
        };
        this.delete = async (req, res) => {
            const { id } = req.params;
            try {
                const user = await this.prisma.user.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!user) {
                    res.status(404).json({ error: "Usuário não encontrado" });
                    return;
                }
                await this.prisma.user.delete({
                    where: { id: parseInt(id) },
                });
                res.status(200).json({ message: "Usuário deletado com sucesso" });
            }
            catch (error) {
                res.status(500).json({ error: "Erro ao deletar usuário" });
            }
        };
    }
}
exports.UserController = UserController;
