import { PrismaClient, Student } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateStudentRequest {
  name: string;
  email: string;
  country: string;
  university: string;
  course: string;
  language: string;
}

const createStudent = async (req: Request<{}, {}, CreateStudentRequest>, res: Response): Promise<void> => {
  const { name, email, country, university, course, language } = req.body;

  try {
    const student: Student = await prisma.student.create({
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
    res.status(500).json({ error: 'Erro ao criar estudante' });
  }
};

export { createStudent };
