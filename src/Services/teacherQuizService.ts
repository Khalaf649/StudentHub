import prisma from "../lib/prisma.ts";
import {
  CreateQuizDTO,
  AssignQuizDTO,
  QuizDTO,
  QuizFilters,
} from "../dtos/teacherQuiz.dto.ts";
import {
  UpdateQuizDTO,
  GradeQuizAssignmentDTO,
} from "../dtos/teacherExtended.dto.ts";
import { ITeacherQuizService } from "./interfaces/teacherQuiz.service.interface.ts";
import { AppError } from "../errors/AppError.ts";

class TeacherQuizService implements ITeacherQuizService {
  async createQuiz(data: CreateQuizDTO): Promise<void> {
    const { session_id, title, description, full_mark } = data;
    await prisma.quizzes.create({
      data: {
        session_id,
        title,
        description,
        full_mark,
      },
    });
  }

  async assignQuiz(data: AssignQuizDTO): Promise<void> {
    const { student_id, quiz_id, grade } = data;
    await prisma.quizAssignments.create({
      data: {
        student_id,
        quiz_id,
        grade,
      },
    });
  }

  async getQuizzes(filters: QuizFilters): Promise<QuizDTO[]> {
    const where: any = {};

    // Apply filters
    if (filters.id) where.id = filters.id;
    if (filters.section) where.section = filters.section;
    if (filters.center_id) where.center_id = filters.center_id;

    const quizzes: QuizDTO[] = await prisma.quizzes.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        full_mark: true,
        sessions: {
          select: {
            id: true,
            title: true,
            section: true,
            center_id: true,
          },
        },
      },
    });

    return quizzes;
  }

  async updateQuiz(id: number, data: UpdateQuizDTO): Promise<void> {
    const { title, description, full_mark } = data;
    await prisma.quizzes.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(full_mark && { full_mark }),
      },
    });
  }

  async deleteQuiz(id: number): Promise<void> {
    await prisma.quizzes.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async gradeQuizAssignment(
    data: GradeQuizAssignmentDTO,
    graderName?: string,
  ): Promise<void> {
    const assignment = await prisma.quizAssignments.findUnique({
      where: {
        student_id_quiz_id: {
          student_id: data.student_id,
          quiz_id: data.quiz_id,
        },
      },
    });

    if (!assignment) {
      throw new AppError("Quiz assignment not found", 404);
    }

    await prisma.quizAssignments.update({
      where: {
        student_id_quiz_id: {
          student_id: data.student_id,
          quiz_id: data.quiz_id,
        },
      },
      data: {
        grade: data.grade,
        gradeUpdatedAt: new Date(),
        gradeUpdatedByName: graderName,
      },
    });
  }
}

export default TeacherQuizService;
