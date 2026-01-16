import { getStudentQuizDTO } from "../../dtos/studentQuiz.dto.ts";
export interface IStudentQuizService {
  getStudentQuizzes(studentId: number): Promise<getStudentQuizDTO[]>;
}
