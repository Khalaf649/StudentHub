import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function createQuizService(
  session_id: number,
  full_mark: number,
  title: string,
  description: string
) {
  const quiz = await prisma.quizzes.create({
    data: {
      session_id,
      full_mark,
      title,
      description,
    },
  });
  return quiz;
}

export default createQuizService;
