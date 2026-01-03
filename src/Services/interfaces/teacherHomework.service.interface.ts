import {
  CreateHomeworkDTO,
  AssignHomeWorkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../../dtos/teacherHomework.dto";

export interface ITeacherHomeworkService {
  createHomework(data: CreateHomeworkDTO): Promise<void>;
  assignHomework(data: AssignHomeWorkDTO): Promise<void>;
  getHomeworks(filters?: HomeworkFilters): Promise<HomeworkDTO[]>;
}
