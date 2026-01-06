// services/studentQuiz.service.ts
import { IStudentQuizService } from "./interfaces/studentQuiz.service.interface.js";
import { getStudentQuizDTO } from "../dtos/studentQuiz.dto.js";
import prisma from "../lib/prisma.js";

class StudentQuizService implements IStudentQuizService {
  async getStudentQuizzes(studentId: number): Promise<getStudentQuizDTO[]> {
    const quizzes = await prisma.quizAssignments.findMany({
      where: { student_id: studentId },
      select: {
        grade: true,
        quizzes: {
          select: {
            id: true,
            title: true,
            description: true,
            full_mark: true,
          },
        },
      },
    });

    return quizzes;
  }
}

export default StudentQuizService;
