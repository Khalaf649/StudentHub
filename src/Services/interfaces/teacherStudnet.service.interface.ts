import { StudentFilters, StudentDTO } from "../../dtos/teacherStudent.dto.js";

export interface ITeacherStudentService {
  getStudents(filters?: StudentFilters): Promise<StudentDTO[]>;
}
