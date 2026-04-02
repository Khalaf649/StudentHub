import { promises } from "node:dns";
import {
  CreateQuizDTO,
  AssignQuizDTO,
  QuizFilters,
  QuizDTO,
} from "../../dtos/teacherQuiz.dto.ts";
import {
  UpdateQuizDTO,
  GradeQuizAssignmentDTO,
} from "../../dtos/teacherExtended.dto.ts";

export interface ITeacherQuizService {
  createQuiz(data: CreateQuizDTO): Promise<void>;
  assignQuiz(data: AssignQuizDTO): Promise<void>;
  getQuizzes(filters?: QuizFilters): Promise<QuizDTO[]>;
  updateQuiz(id: number, data: UpdateQuizDTO): Promise<void>;
  deleteQuiz(id: number): Promise<void>;
  gradeQuizAssignment(
    data: GradeQuizAssignmentDTO,
    graderName?: string,
  ): Promise<void>;
}
