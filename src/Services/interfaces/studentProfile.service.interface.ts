// Student Profile Service Interface
import {
  UpdateStudentProfileDTO,
  ChangePasswordDTO,
  StudentGradesDTO,
  StudentAttendanceDTO,
  StudentHomeworkDetailDTO,
  StudentQuizDetailDTO,
} from "../../dtos/studentProfile.dto.ts";

export interface IStudentProfileService {
  updateProfile(
    studentId: number,
    data: UpdateStudentProfileDTO,
  ): Promise<void>;
  changePassword(studentId: number, data: ChangePasswordDTO): Promise<void>;
  getGrades(studentId: number): Promise<StudentGradesDTO>;
  getAttendance(studentId: number): Promise<StudentAttendanceDTO[]>;
  getHomeworkDetails(
    studentId: number,
    homeworkId: number,
  ): Promise<StudentHomeworkDetailDTO>;
  getQuizDetails(
    studentId: number,
    quizId: number,
  ): Promise<StudentQuizDetailDTO>;
  deleteAccount(studentId: number): Promise<void>;
}
