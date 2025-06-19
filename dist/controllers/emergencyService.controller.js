"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyServiceController = void 0;
class EmergencyServiceController {
    constructor(prisma) {
        this.prisma = prisma;
        // Listar todos os serviços de emergência
        this.index = async (req, res) => {
            try {
                const services = await this.prisma.emergencyService.findMany();
                res.json(services);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar serviços de emergência' });
            }
        };
        // Buscar um serviço pelo ID
        this.show = async (req, res) => {
            const id = Number(req.params.id);
            try {
                const service = await this.prisma.emergencyService.findUnique({
                    where: { id },
                });
                if (!service) {
                    res.status(404).json({ error: 'Serviço de emergência não encontrado' });
                    return;
                }
                res.json(service);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao buscar serviço de emergência' });
            }
        };
        // Criar novo serviço de emergência
        this.create = async (req, res) => {
            const { serviceName, phoneNumber, address, type } = req.body;
            try {
                const service = await this.prisma.emergencyService.create({
                    data: {
                        serviceName,
                        phoneNumber,
                        address,
                        type,
                    },
                });
                res.status(201).json(service);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao criar serviço de emergência' });
            }
        };
        // Atualizar um serviço existente
        this.update = async (req, res) => {
            const id = Number(req.params.id);
            const { serviceName, phoneNumber, address, type } = req.body;
            try {
                const updatedService = await this.prisma.emergencyService.update({
                    where: { id },
                    data: {
                        serviceName,
                        phoneNumber,
                        address,
                        type,
                    },
                });
                res.json(updatedService);
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao atualizar serviço de emergência' });
            }
        };
        // Deletar um serviço pelo ID
        this.delete = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.prisma.emergencyService.delete({
                    where: { id },
                });
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Erro ao deletar serviço de emergência' });
            }
        };
    }
}
exports.EmergencyServiceController = EmergencyServiceController;
