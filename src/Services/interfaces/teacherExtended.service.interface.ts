import {
  StudentPerformanceDTO,
  AttendanceAnalyticsDTO,
} from "../../dtos/teacherExtended.dto.ts";

export interface ITeacherExtendedService {
  getStudentPerformance(studentId: number): Promise<StudentPerformanceDTO>;
  getAttendanceAnalytics(sessionId: number): Promise<AttendanceAnalyticsDTO>;
}
