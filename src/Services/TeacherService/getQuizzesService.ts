import prisma from "../../prisma";
import QuizFilters from "../../Interfaces/QuizFilter";
export async function getStudentQuizzesService(filters: QuizFilters) {
  const quizzes = await prisma.quizzes.findMany({
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

export default getStudentQuizzesService;
