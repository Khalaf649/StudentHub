import { getStudentHomeworkDTO } from "../../dtos/studnetHomework.dto.ts";
export interface IStudentHomeworkService {
  getStudentHomework(studentId: number): Promise<getStudentHomeworkDTO[]>;
}
