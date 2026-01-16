import { getStudentSessionsDTO } from "../../dtos/studentSession.dto.ts";

export interface IStudentSessionService {
  getStudentSessions(studentId: number): Promise<getStudentSessionsDTO[]>;
}
