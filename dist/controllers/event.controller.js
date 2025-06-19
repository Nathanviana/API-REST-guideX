"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
class EventController {
    constructor(prisma) {
        this.prisma = prisma;
        this.index = async (req, res) => {
            const events = await this.prisma.event.findMany();
            res.json(events);
        };
        this.show = async (req, res) => {
            const id = Number(req.params.id);
            const event = await this.prisma.event.findUnique({
                where: { id },
            });
            if (!event) {
                res.status(404).json({ error: 'Event not found' });
                return;
            }
            res.json(event);
        };
        this.create = async (req, res) => {
            const { name, description, startDate, endDate, location } = req.body;
            try {
                const event = await this.prisma.event.create({
                    data: { name, description, startDate, endDate, location },
                });
                res.status(201).json(event);
            }
            catch (error) {
                res.status(500).json({ error: 'Error creating event' });
            }
        };
        this.update = async (req, res) => {
            const id = Number(req.params.id);
            const { name, description, startDate, endDate, location } = req.body;
            try {
                const updatedEvent = await this.prisma.event.update({
                    where: { id },
                    data: { name, description, startDate, endDate, location },
                });
                res.json(updatedEvent);
            }
            catch (error) {
                res.status(500).json({ error: 'Error updating event' });
            }
        };
        this.delete = async (req, res) => {
            const id = Number(req.params.id);
            try {
                await this.prisma.event.delete({ where: { id } });
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting event' });
            }
        };
    }
}
exports.EventController = EventController;
