import { IStudentProfileService } from "./interfaces/studentProfile.service.interface.ts";
import {
  UpdateStudentProfileDTO,
  ChangePasswordDTO,
  StudentGradesDTO,
  StudentAttendanceDTO,
  StudentHomeworkDetailDTO,
  StudentQuizDetailDTO,
} from "../dtos/studentProfile.dto.ts";
import { AppError } from "../errors/AppError.ts";
import prisma from "../lib/prisma.ts";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class StudentProfileService implements IStudentProfileService {
  async updateProfile(
    studentId: number,
    data: UpdateStudentProfileDTO,
  ): Promise<void> {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    await prisma.students.update({
      where: { id: studentId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.phone && { phone: data.phone }),
      },
    });
  }

  async changePassword(
    studentId: number,
    data: ChangePasswordDTO,
  ): Promise<void> {
    if (data.newPassword !== data.confirmPassword) {
      throw new AppError("Passwords do not match", 400);
    }

    const student = await prisma.students.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      student.password,
    );
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS);

    await prisma.students.update({
      where: { id: studentId },
      data: { password: hashedPassword },
    });
  }

  async getGrades(studentId: number): Promise<StudentGradesDTO> {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
      include: {
        homework_submissions: true,
        quizAssignments: true,
      },
    });

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    const homeworkGrades = student.homework_submissions.map((h) => h.grade);
    const quizGrades = student.quizAssignments.map((q) => q.grade);

    const averageHomeworkGrade =
      homeworkGrades.length > 0
        ? Math.round(
            (homeworkGrades.reduce((sum, grade) => sum + grade, 0) /
              homeworkGrades.length) *
              10,
          ) / 10
        : 0;

    const averageQuizGrade =
      quizGrades.length > 0
        ? Math.round(
            (quizGrades.reduce((sum, grade) => sum + grade, 0) /
              quizGrades.length) *
              10,
          ) / 10
        : 0;

    const totalGrade =
      Math.round(((averageHomeworkGrade + averageQuizGrade) / 2) * 10) / 10;

    return {
      studentId,
      studentName: student.name,
      averageHomeworkGrade,
      averageQuizGrade,
      totalGrade,
      homeworkCount: homeworkGrades.length,
      quizCount: quizGrades.length,
    };
  }

  async getAttendance(studentId: number): Promise<StudentAttendanceDTO[]> {
    const attendances = await prisma.attendances.findMany({
      where: { student_id: studentId },
      include: {
        sessions: true,
      },
    });

    return attendances.map((a) => ({
      sessionId: a.session_id,
      sessionTitle: a.sessions.title,
      status: a.status as "present" | "absent",
      sessionDate: a.sessions.session_datetime,
    }));
  }

  async getHomeworkDetails(
    studentId: number,
    homeworkId: number,
  ): Promise<StudentHomeworkDetailDTO> {
    const homework = await prisma.homeworks.findUnique({
      where: { id: homeworkId },
      include: {
        homework_submissions: {
          where: { student_id: studentId },
        },
      },
    });

    if (!homework) {
      throw new AppError("Homework not found", 404);
    }

    const submission = homework.homework_submissions[0];

    return {
      id: homework.id,
      title: homework.title,
      description: homework.description,
      dueDate: homework.due_date,
      fullMark: homework.full_mark,
      submittedDate: submission?.submission_date,
      grade: submission?.grade,
      status: !submission
        ? "pending"
        : submission.grade
          ? "graded"
          : "submitted",
    };
  }

  async getQuizDetails(
    studentId: number,
    quizId: number,
  ): Promise<StudentQuizDetailDTO> {
    const quiz = await prisma.quizzes.findUnique({
      where: { id: quizId },
      include: {
        sessions: true,
        quizAssignments: {
          where: { student_id: studentId },
        },
      },
    });

    if (!quiz) {
      throw new AppError("Quiz not found", 404);
    }

    const assignment = quiz.quizAssignments[0];

    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description ?? undefined,
      sessionDate: quiz.sessions.session_datetime,
      fullMark: quiz.full_mark,
      obtainedGrade: assignment?.grade,
      status: assignment ? "completed" : "pending",
    };
  }

  async deleteAccount(studentId: number): Promise<void> {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new AppError("Student not found", 404);
    }

    // Soft delete
    await prisma.students.update({
      where: { id: studentId },
      data: { deletedAt: new Date() },
    });
  }
}

export default StudentProfileService;
