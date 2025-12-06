import { attendance_status } from "@prisma/client";
import prisma from "../../prisma";
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
