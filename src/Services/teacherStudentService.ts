import { ITeacherStudentService } from "./interfaces/teacherStudnet.service.interface.js";
import { StudentFilters, StudentDTO } from "../dtos/teacherStudent.dto.js";
import { attendance_status } from "../generated/client/enums.js";
import prisma from "../lib/prisma.js";

class TeacherStudentService implements ITeacherStudentService {
  async getStudents(filters: StudentFilters): Promise<StudentDTO[]> {
    const where: any = {};
    // Existing filters
    where.id = filters.id || undefined;
    where.section = filters.section || undefined;
    where.center_id = filters.center_id || undefined;

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
          submission_date: { not: null },
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

    const students: StudentDTO[] = await prisma.students.findMany({
      where,
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
