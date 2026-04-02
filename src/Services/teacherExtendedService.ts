import prisma from "../lib/prisma.ts";
import { ITeacherExtendedService } from "./interfaces/teacherExtended.service.interface.ts";
import {
  StudentPerformanceDTO,
  AttendanceAnalyticsDTO,
} from "../dtos/teacherExtended.dto.ts";
import { AppError } from "../errors/AppError.ts";

class TeacherExtendedService implements ITeacherExtendedService {
  async getStudentPerformance(
    studentId: number,
  ): Promise<StudentPerformanceDTO> {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
      include: {
        homework_submissions: true,
        quizAssignments: true,
        attendances: true,
      },
    });

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    const homeworkGrades = student.homework_submissions.map((h) => h.grade);
    const quizGrades = student.quizAssignments.map((q) => q.grade);
    const presentDays = student.attendances.filter(
      (a) => a.status === "present",
    ).length;

    const performance: StudentPerformanceDTO = {
      studentId: student.id,
      studentName: student.name,
      email: student.email,
      phone: student.phone,
      averageHomeworkGrade:
        homeworkGrades.length > 0
          ? Math.round(
              (homeworkGrades.reduce((sum, g) => sum + g, 0) /
                homeworkGrades.length) *
                10,
            ) / 10
          : 0,
      averageQuizGrade:
        quizGrades.length > 0
          ? Math.round(
              (quizGrades.reduce((sum, g) => sum + g, 0) / quizGrades.length) *
                10,
            ) / 10
          : 0,
      totalGrade:
        homeworkGrades.length > 0 || quizGrades.length > 0
          ? Math.round(
              (((homeworkGrades.length > 0
                ? homeworkGrades.reduce((sum, g) => sum + g, 0) /
                  homeworkGrades.length
                : 0) +
                (quizGrades.length > 0
                  ? quizGrades.reduce((sum, g) => sum + g, 0) /
                    quizGrades.length
                  : 0)) /
                2) *
                10,
            ) / 10
          : 0,
      attendanceRate:
        student.attendances.length > 0
          ? Math.round((presentDays / student.attendances.length) * 100 * 10) /
            10
          : 0,
      homeworkSubmissionRate: homeworkGrades.length > 0 ? 100 : 0,
      quizParticipationRate: quizGrades.length > 0 ? 100 : 0,
    };

    return performance;
  }

  async getAttendanceAnalytics(
    sessionId: number,
  ): Promise<AttendanceAnalyticsDTO> {
    const session = await prisma.sessions.findUnique({
      where: { id: sessionId },
      include: {
        attendances: true,
      },
    });

    if (!session) {
      throw new AppError("Session not found", 404);
    }

    const presentCount = session.attendances.filter(
      (a) => a.status === "present",
    ).length;
    const absentCount = session.attendances.filter(
      (a) => a.status === "absent",
    ).length;
    const totalCount = session.attendances.length;

    const analytics: AttendanceAnalyticsDTO = {
      sessionId: session.id,
      sessionTitle: session.title,
      totalStudents: totalCount,
      presentCount,
      absentCount,
      attendanceRate:
        totalCount > 0
          ? Math.round((presentCount / totalCount) * 100 * 10) / 10
          : 0,
    };

    return analytics;
  }
}

export default TeacherExtendedService;
