import {
  CreateQuizDTO,
  AssignQuizDTO,
  QuizFilters,
  QuizDTO,
} from "../../dtos/teacherQuiz.dto.js";

export interface ITeacherQuizService {
  createQuiz(data: CreateQuizDTO): Promise<void>;
  assignQuiz(data: AssignQuizDTO): Promise<void>;
  getQuizzes(filters?: QuizFilters): Promise<QuizDTO[]>;
}
