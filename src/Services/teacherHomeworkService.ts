import prisma from "../lib/prisma";
import { ITeacherHomeworkService } from "./interfaces/teacherHomework.service.interface";
import {
  CreateHomeworkDTO,
  AssignHomeWorkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../dtos/teacherHomework.dto";

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
  async assignHomework(data: AssignHomeWorkDTO): Promise<void> {
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
}
export default TeacherHomeworkService;
