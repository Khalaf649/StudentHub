import {
  createSessionDTO,
  getSessionDTO,
  SessionFilters,
  assignSessionDTO,
} from "../../dtos/teacherSession.dto.js";
export interface ITeacherSessionService {
  createSession(data: createSessionDTO): Promise<void>;
  getSessions(filters?: SessionFilters): Promise<getSessionDTO[]>;
  assignSession(data: assignSessionDTO): Promise<void>;
}
