import prisma from "../../prisma";
import StudentFilters from "../../Interfaces/StudentFilters";

export async function getStudentsService(filters: StudentFilters) {
  const where: any = {};

  if (filters.id) {
    where.id = filters.id;
  }

  // Existing filters
  where.section = filters.section || undefined;
  where.center_id = filters.center_id || undefined;

  if (filters.session_id) {
    where.student_sessions = {
      some: {
        session_id: filters.session_id,
        status: "present",
      },
    };
  }

  if (filters.homework_id) {
    where.student_homeworks = {
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

  const students = await prisma.students.findMany({
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

export default getStudentsService;
