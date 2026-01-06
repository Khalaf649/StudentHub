import { getStudentHomeworkDTO } from "../../dtos/studnetHomework.dto.js";
export interface IStudentHomeworkService {
  getStudentHomework(studentId: number): Promise<getStudentHomeworkDTO[]>;
}
