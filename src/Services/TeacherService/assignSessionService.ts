import { PrismaClient, attendance_status } from "@prisma/client";
const prisma = new PrismaClient();
async function assignSessionService(
  studentId: number,
  sessionId: number,
  status: attendance_status
) {
  const assignment = await prisma.student_sessions.create({
    data: {
      student_id: studentId,
      session_id: sessionId,
      status,
    },
  });
  return assignment;
}

export default assignSessionService;
