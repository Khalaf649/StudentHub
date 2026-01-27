import { ITeacherStudentService } from "./interfaces/teacherStudnet.service.interface.ts";
import { StudentFilters, StudentDTO } from "../dtos/teacherStudent.dto.ts";
import { attendance_status } from "../generated/client/enums.ts";
import prisma from "../lib/prisma.ts";
const ITEMS_PER_PAGE = parseInt(process.env.ITEMS_PER_PAGE || "10", 10);

class TeacherStudentService implements ITeacherStudentService {
  async getStudents(filters: StudentFilters): Promise<StudentDTO[]> {
    const where: any = {};
    // Existing filters
    where.section = filters.section || undefined;
    where.center_id = filters.center_id || undefined;
    where.name = filters.name || undefined;

    if (filters.name) {
      where.name = {
        startsWith: filters.name,
        mode: "insensitive",
      };
    }

    if (filters.session_id) {
      where.attendances = {
        some: {
          session_id: filters.session_id,
          status: attendance_status.present,
        },
      };
    }

    if (filters.homework_id) {
      where.homework_submissions = {
        some: {
          homework_id: filters.homework_id,
        },
      };
    }

    if (filters.quiz_id) {
      where.student_quizzes = {
        some: {
          quiz_id: filters.quiz_id,
        },
      };
    }
    const skip = (filters.page - 1) * ITEMS_PER_PAGE;
    const students: StudentDTO[] = await prisma.students.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        section: true,

        centers: {
          select: {
            id: true,
            name: true,
          },
        },

        student_parents: {
          select: {
            role: true,
            parents: {
              select: {
                id: true,
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return students;
  }
}

export default TeacherStudentService;
