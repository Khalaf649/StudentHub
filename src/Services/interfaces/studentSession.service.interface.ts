import { getStudentSessionsDTO } from "../../dtos/studentSession.dto.js";

export interface IStudentSessionService {
  getStudentSessions(studentId: number): Promise<getStudentSessionsDTO[]>;
}
