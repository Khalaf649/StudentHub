import prisma from "../../prisma";
async function assignQuizService(
  studentId: number,
  quizId: number,
  grade: number
) {
  const assignment = await prisma.student_quizzes.create({
    data: {
      student_id: studentId,
      quiz_id: quizId,
      grade,
    },
  });
  return assignment;
}

export default assignQuizService;
