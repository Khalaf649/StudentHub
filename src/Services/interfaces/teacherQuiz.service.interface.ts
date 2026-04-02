import { promises } from "node:dns";
import {
  CreateQuizDTO,
  AssignQuizDTO,
  QuizFilters,
  QuizDTO,
} from "../../dtos/teacherQuiz.dto.ts";

export interface ITeacherQuizService {
  createQuiz(data: CreateQuizDTO): Promise<void>;
  assignQuiz(data: AssignQuizDTO): Promise<void>;
  getQuizzes(filters?: QuizFilters): Promise<QuizDTO[]>;
  updateQuiz(id: number, data: CreateQuizDTO): Promise<void>;
  deleteQuiz(id: number): Promise<void>;
}
