import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import {
  UpdateHomeworkDTO,
  UpdateQuizDTO,
  GradeHomeworkSubmissionDTO,
  GradeQuizAssignmentDTO,
  StudentPerformanceDTO,
  AttendanceAnalyticsDTO,
} from "../dtos/teacherExtended.dto.ts";
import { AppError } from "../errors/AppError.ts";
import prisma from "../lib/prisma.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";

class TeacherExtendedController {
  async updateHomework(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const homeworkId = Number(req.params.id);
      const data: UpdateHomeworkDTO = req.body;

      const homework = await prisma.homeworks.findUnique({
        where: { id: homeworkId },
      });

      if (!homework) {
        throw new AppError("Homework not found", 404);
      }

      await prisma.homeworks.update({
        where: { id: homeworkId },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.start_date && { start_date: data.start_date }),
          ...(data.due_date && { due_date: data.due_date }),
          ...(data.full_mark && { full_mark: data.full_mark }),
        },
      });

      res
        .status(200)
        .json(ResponseHandler.success(null, "Homework updated successfully"));
    } catch (err) {
      next(err);
    }
  }

  async deleteHomework(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const homeworkId = Number(req.params.id);

      const homework = await prisma.homeworks.findUnique({
        where: { id: homeworkId },
      });

      if (!homework) {
        throw new AppError("Homework not found", 404);
      }

      // Soft delete
      await prisma.homeworks.update({
        where: { id: homeworkId },
        data: { deletedAt: new Date() },
      });

      res
        .status(200)
        .json(ResponseHandler.success(null, "Homework deleted successfully"));
    } catch (err) {
      next(err);
    }
  }

  async updateQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);
      const data: UpdateQuizDTO = req.body;

      const quiz = await prisma.quizzes.findUnique({
        where: { id: quizId },
      });

      if (!quiz) {
        throw new AppError("Quiz not found", 404);
      }

      await prisma.quizzes.update({
        where: { id: quizId },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.full_mark && { full_mark: data.full_mark }),
        },
      });

      res
        .status(200)
        .json(ResponseHandler.success(null, "Quiz updated successfully"));
    } catch (err) {
      next(err);
    }
  }

  async deleteQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);

      const quiz = await prisma.quizzes.findUnique({
        where: { id: quizId },
      });

      if (!quiz) {
        throw new AppError("Quiz not found", 404);
      }

      // Soft delete
      await prisma.quizzes.update({
        where: { id: quizId },
        data: { deletedAt: new Date() },
      });

      res
        .status(200)
        .json(ResponseHandler.success(null, "Quiz deleted successfully"));
    } catch (err) {
      next(err);
    }
  }

  async gradeHomeworkSubmission(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data: GradeHomeworkSubmissionDTO = req.body;

      const submission = await prisma.homework_submissions.findUnique({
        where: {
          student_id_homework_id: {
            student_id: data.student_id,
            homework_id: data.homework_id,
          },
        },
      });

      if (!submission) {
        throw new AppError("Homework submission not found", 404);
      }

      await prisma.homework_submissions.update({
        where: {
          student_id_homework_id: {
            student_id: data.student_id,
            homework_id: data.homework_id,
          },
        },
        data: {
          grade: data.grade,
          gradeUpdatedAt: new Date(),
          gradeUpdatedByName: (req.user as any)?.name || "Unknown",
        },
      });

      res
        .status(200)
        .json(ResponseHandler.success(null, "Homework graded successfully"));
    } catch (err) {
      next(err);
    }
  }

  async gradeQuizAssignment(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data: GradeQuizAssignmentDTO = req.body;

      const assignment = await prisma.quizAssignments.findUnique({
        where: {
          student_id_quiz_id: {
            student_id: data.student_id,
            quiz_id: data.quiz_id,
          },
        },
      });

      if (!assignment) {
        throw new AppError("Quiz assignment not found", 404);
      }

      await prisma.quizAssignments.update({
        where: {
          student_id_quiz_id: {
            student_id: data.student_id,
            quiz_id: data.quiz_id,
          },
        },
        data: {
          grade: data.grade,
          gradeUpdatedAt: new Date(),
          gradeUpdatedByName: (req.user as any)?.name || "Unknown",
        },
      });

      res
        .status(200)
        .json(ResponseHandler.success(null, "Quiz graded successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getStudentPerformance(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const studentId = Number(req.params.studentId);

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
                (quizGrades.reduce((sum, g) => sum + g, 0) /
                  quizGrades.length) *
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
            ? Math.round(
                (presentDays / student.attendances.length) * 100 * 10,
              ) / 10
            : 0,
        homeworkSubmissionRate: homeworkGrades.length > 0 ? 100 : 0,
        quizParticipationRate: quizGrades.length > 0 ? 100 : 0,
      };

      res.status(200).json(ResponseHandler.success(performance));
    } catch (err) {
      next(err);
    }
  }

  async getAttendanceAnalytics(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sessionId = Number(req.params.sessionId);

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

      res.status(200).json(ResponseHandler.success(analytics));
    } catch (err) {
      next(err);
    }
  }
}

const teacherExtendedController = new TeacherExtendedController();

export const updateHomework = teacherExtendedController.updateHomework.bind(
  teacherExtendedController,
);
export const deleteHomework = teacherExtendedController.deleteHomework.bind(
  teacherExtendedController,
);
export const updateQuiz = teacherExtendedController.updateQuiz.bind(
  teacherExtendedController,
);
export const deleteQuiz = teacherExtendedController.deleteQuiz.bind(
  teacherExtendedController,
);
export const gradeHomeworkSubmission =
  teacherExtendedController.gradeHomeworkSubmission.bind(
    teacherExtendedController,
  );
export const gradeQuizAssignment =
  teacherExtendedController.gradeQuizAssignment.bind(teacherExtendedController);
export const getStudentPerformance =
  teacherExtendedController.getStudentPerformance.bind(
    teacherExtendedController,
  );
export const getAttendanceAnalytics =
  teacherExtendedController.getAttendanceAnalytics.bind(
    teacherExtendedController,
  );

export default TeacherExtendedController;
