import { StudentFilters, StudentDTO } from "../../dtos/teacherStudent.dto.ts";

export interface ITeacherStudentService {
  getStudents(filters?: StudentFilters): Promise<StudentDTO[]>;
}
