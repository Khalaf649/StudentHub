import { StudentFilters, StudentDTO } from "../../dtos/teacherStudent.dto";

export interface ITeacherStudentService {
  getStudents(filters?: StudentFilters): Promise<StudentDTO[]>;
}
