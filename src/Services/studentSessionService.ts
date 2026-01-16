import prisma from "../lib/prisma.ts";
import { IStudentSessionService } from "./interfaces/studentSession.service.interface.ts";
import { getStudentSessionsDTO } from "../dtos/studentSession.dto.ts";

class StudentSessionService implements IStudentSessionService {
  async getStudentSessions(
    studentId: number
  ): Promise<getStudentSessionsDTO[]> {
    const sessions = await prisma.attendances.findMany({
      where: { student_id: studentId },
      select: {
        id: true,
        status: true,
        sessions: {
          select: {
            title: true,
            session_datetime: true,
            description: true,
            section: true,
          },
        },
      },
    });
    return sessions;
  }
}

export default StudentSessionService;
