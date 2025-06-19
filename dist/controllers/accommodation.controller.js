"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccommodationController = void 0;
class AccommodationController {
    constructor(prisma) {
        this.prisma = prisma;
        this.index = async (req, res) => {
            const accommodations = await this.prisma.accommodation.findMany();
            res.json(accommodations);
        };
        this.show = async (req, res) => {
            const id = Number(req.params.id);
            const accommodation = await this.prisma.accommodation.findUnique({
                where: { id },
            });
            if (!accommodation) {
                res.status(404).json({ error: 'Accommodation not found' });
                return;
            }
            res.json(accommodation);
        };
        this.create = async (req, res) => {
            const { name, address, description, availability } = req.body;
            try {
                const accommodation = await this.prisma.accommodation.create({
                    data: { name, address, description, availability },
                });
                res.status(201).json(accommodation);
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating accommodation' });
            }
        };
        this.update = async (req, res) => {
            const id = Number(req.params.id);
            const { name, address, description, availability } = req.body;
            try {
                const updatedAccommodation = await this.prisma.accommodation.update({
                    where: { id },
                    data: { name, address, description, availability },
                });
                res.json(updatedAccommodation);
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating accommodation' });
            }
        };
        this.delete = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.prisma.accommodation.delete({ where: { id } });
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting accommodation' });
            }
        };
    }
}
exports.AccommodationController = AccommodationController;
