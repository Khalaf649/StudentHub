import prisma from "../lib/prisma.ts";
import { ITeacherSessionService } from "./interfaces/teacherSession.service.interface.ts";
import {
  assignSessionDTO,
  createSessionDTO,
  getSessionDTO,
  SessionFilters,
} from "../dtos/teacherSession.dto.ts";

class TeacherSessionService implements ITeacherSessionService {
  async createSession(data: createSessionDTO): Promise<void> {
    const { title, description, center_id, section, session_datetime } = data;
    await prisma.sessions.create({
      data: {
        title,
        description,
        center_id,
        section,
        session_datetime,
      },
    });
  }
  async getSessions(filters: SessionFilters): Promise<getSessionDTO[]> {
    const where: any = {};

    if (filters.id) where.id = filters.id;

    if (filters.section) where.section = filters.section;
    if (filters.center_id) where.center_id = filters.center_id;

    const sessions: getSessionDTO[] = await prisma.sessions.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        session_datetime: true,
        section: true,
        centers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return sessions;
  }
  async assignSession(data: assignSessionDTO): Promise<void> {
    const { student_id, session_id, status } = data;
    await prisma.attendances.create({
      data: {
        student_id,
        session_id,
        status,
      },
    });
  }
}

export default TeacherSessionService;
