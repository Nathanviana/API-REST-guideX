import { PrismaClient, Student } from "@prisma/client";
import { Request, Response } from "express";

export class StudentController {
  constructor(private prisma: PrismaClient) {}

  index = async (req: Request, res: Response): Promise<void> => {
    const students = await this.prisma.student.findMany();
    res.json(students);
  };

  show = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const student = await this.prisma.student.findUnique({ where: { id } });

    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json(student);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { name, email, country, university, course, language } = req.body;

    try {
      const student = await this.prisma.student.create({
        data: {
          name,
          email,
          country,
          university,
          course,
          language,
        },
      });
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: "Error creating student" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { name, email, country, university, course, language } = req.body;

    try {
      const updatedStudent = await this.prisma.student.update({
        where: { id },
        data: { name, email, country, university, course, language },
      });
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: "Error updating student" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.prisma.student.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting student" });
    }
  };
}
