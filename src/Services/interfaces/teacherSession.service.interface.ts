import {
  createSessionDTO,
  getSessionDTO,
  SessionFilters,
} from "../../dtos/teacherSession.dto";
export interface ITeacherSessionService {
  createSession(data: createSessionDTO): Promise<void>;
  getSessions(filters?: SessionFilters): Promise<getSessionDTO[]>;
}
