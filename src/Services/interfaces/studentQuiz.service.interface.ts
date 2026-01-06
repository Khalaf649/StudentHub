import { getStudentQuizDTO } from "../../dtos/studentQuiz.dto.js";
export interface IStudentQuizService {
  getStudentQuizzes(studentId: number): Promise<getStudentQuizDTO[]>;
}
