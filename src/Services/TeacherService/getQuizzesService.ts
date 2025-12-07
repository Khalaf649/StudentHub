import prisma from "../../prisma";
import QuizFilters from "../../Interfaces/QuizFilter";

export async function getQuizzesService(filters: QuizFilters) {
  const where: any = {};

  // Apply filters
  if (filters.id) where.id = filters.id;
  if (filters.section) where.section = filters.section;
  if (filters.center_id) where.center_id = filters.center_id;

  const quizzes = await prisma.quizzes.findMany({
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

export default getQuizzesService;
