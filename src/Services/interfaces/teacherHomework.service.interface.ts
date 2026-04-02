import {
  CreateHomeworkDTO,
  AssignHomeworkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../../dtos/teacherHomework.dto.ts";
import {
  UpdateHomeworkDTO,
  GradeHomeworkSubmissionDTO,
} from "../../dtos/teacherExtended.dto.ts";

export interface ITeacherHomeworkService {
  createHomework(data: CreateHomeworkDTO): Promise<void>;
  assignHomework(data: AssignHomeworkDTO): Promise<void>;
  getHomeworks(filters?: HomeworkFilters): Promise<HomeworkDTO[]>;
  updateHomework(homeworkId: number, data: UpdateHomeworkDTO): Promise<void>;
  deleteHomework(homeworkId: number): Promise<void>;
  gradeHomeworkSubmission(
    data: GradeHomeworkSubmissionDTO,
    graderName?: string,
  ): Promise<void>;
}
