import {
  CreateHomeworkDTO,
  AssignHomeworkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../../dtos/teacherHomework.dto.ts";

export interface ITeacherHomeworkService {
  createHomework(data: CreateHomeworkDTO): Promise<void>;
  assignHomework(data: AssignHomeworkDTO): Promise<void>;
  getHomeworks(filters?: HomeworkFilters): Promise<HomeworkDTO[]>;
}
