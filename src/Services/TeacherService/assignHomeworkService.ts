import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function assignHomeworkService(
  studentId: number,
  homeworkId: number,
  grade: number,
  submissionDate: string
) {
  const assignment = await prisma.student_homework.create({
    data: {
      student_id: studentId,
      homework_id: homeworkId,
      grade,
      submission_date: submissionDate,
    },
  });
  return assignment;
}
export default assignHomeworkService;
