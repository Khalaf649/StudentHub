import prisma from "../lib/prisma.ts";
import { ITeacherHomeworkService } from "./interfaces/teacherHomework.service.interface.ts";
import {
  CreateHomeworkDTO,
  AssignHomeworkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../dtos/teacherHomework.dto.ts";
import {
  UpdateHomeworkDTO,
  GradeHomeworkSubmissionDTO,
} from "../dtos/teacherExtended.dto.ts";
import { AppError } from "../errors/AppError.ts";

class TeacherHomeworkService implements ITeacherHomeworkService {
  async createHomework(data: CreateHomeworkDTO): Promise<void> {
    const { session_id, title, start_date, due_date, description, full_mark } =
      data;

    await prisma.homeworks.create({
      data: {
        session_id,
        title,
        start_date,
        due_date,
        description,
        full_mark,
      },
    });
  }

  async assignHomework(data: AssignHomeworkDTO): Promise<void> {
    const { student_id, homework_id, grade, submission_date } = data;

    await prisma.homework_submissions.create({
      data: {
        student_id,
        homework_id,
        grade,
        submission_date,
      },
    });
  }

  async getHomeworks(filters: HomeworkFilters): Promise<HomeworkDTO[]> {
    const where: any = {};

    // Apply filters
    if (filters.id) where.id = filters.id;
    if (filters.section) where.section = filters.section;
    if (filters.center_id) where.center_id = filters.center_id;

    const homeworks: HomeworkDTO[] = await prisma.homeworks.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        start_date: true,
        due_date: true,
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

    return homeworks;
  }

  async updateHomework(
    homeworkId: number,
    data: UpdateHomeworkDTO,
  ): Promise<void> {
    const homework = await prisma.homeworks.findUnique({
      where: { id: homeworkId },
    });

    if (!homework) {
      throw new AppError("Homework not found", 404);
    }

    await prisma.homeworks.update({
      where: { id: homeworkId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.start_date && { start_date: data.start_date }),
        ...(data.due_date && { due_date: data.due_date }),
        ...(data.full_mark && { full_mark: data.full_mark }),
      },
    });
  }

  async deleteHomework(homeworkId: number): Promise<void> {
    const homework = await prisma.homeworks.findUnique({
      where: { id: homeworkId },
    });

    if (!homework) {
      throw new AppError("Homework not found", 404);
    }

    // Soft delete
    await prisma.homeworks.update({
      where: { id: homeworkId },
      data: { deletedAt: new Date() },
    });
  }

  async gradeHomeworkSubmission(
    data: GradeHomeworkSubmissionDTO,
    graderName?: string,
  ): Promise<void> {
    const submission = await prisma.homework_submissions.findUnique({
      where: {
        student_id_homework_id: {
          student_id: data.student_id,
          homework_id: data.homework_id,
        },
      },
    });

    if (!submission) {
      throw new AppError("Homework submission not found", 404);
    }

    await prisma.homework_submissions.update({
      where: {
        student_id_homework_id: {
          student_id: data.student_id,
          homework_id: data.homework_id,
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
export default TeacherHomeworkService;
