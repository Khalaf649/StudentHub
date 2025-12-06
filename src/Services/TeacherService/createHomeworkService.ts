import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function createHomeworkService(
  title: string,
  description: string,
  startDate: string,
  fullMark: number,
  sessionId: number,
  dueDate: string
) {
  const homework = await prisma.homeworks.create({
    data: {
      session_id: sessionId,
      title: title,
      start_date: startDate,
      description: description,
      due_date: dueDate,
      full_mark: fullMark,
    },
  });
  return homework;
}

export default createHomeworkService;
