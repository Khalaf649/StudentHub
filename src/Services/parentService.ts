import { IParentService } from "./interfaces/parent.service.interface.ts";
import {
  ParentChildDTO,
  ParentChildHomeworkDTO,
  ParentChildQuizDTO,
  ParentChildAttendanceDTO,
  ParentChildGradesDTO,
} from "../dtos/parent.dto.ts";
import { AppError } from "../errors/AppError.ts";
import prisma from "../lib/prisma.ts";

class ParentService implements IParentService {
  async getLinkedChildren(parentId: number): Promise<ParentChildDTO[]> {
    const studentParents = await prisma.student_parents.findMany({
      where: { parent_id: parentId },
      include: {
        students: {
          include: {
            centers: true,
          },
        },
      },
    });

    return studentParents.map((sp) => ({
      id: sp.students.id,
      name: sp.students.name,
      email: sp.students.email,
      phone: sp.students.phone,
      section: sp.students.section,
      center: {
        id: sp.students.centers.id,
        name: sp.students.centers.name,
      },
    }));
  }

  async getChildHomeworks(
    parentId: number,
    childId: number,
  ): Promise<ParentChildHomeworkDTO[]> {
    // Verify parent-child relationship
    const studentParent = await prisma.student_parents.findFirst({
      where: {
        parent_id: parentId,
        student_id: childId,
      },
    });

    if (!studentParent) {
      throw new AppError("Unauthorized access to child data", 403);
    }

    const homeworks = await prisma.homeworks.findMany({
      include: {
        homework_submissions: {
          where: { student_id: childId },
        },
      },
    });

    return homeworks.map((hw) => {
      const submission = hw.homework_submissions[0];
      return {
        id: hw.id,
        title: hw.title,
        description: hw.description,
        dueDate: hw.due_date,
        fullMark: hw.full_mark,
        submittedDate: submission?.submission_date,
        grade: submission?.grade,
        status: !submission
          ? "pending"
          : submission.grade
            ? "graded"
            : "submitted",
      };
    });
  }

  async getChildQuizzes(
    parentId: number,
    childId: number,
  ): Promise<ParentChildQuizDTO[]> {
    // Verify parent-child relationship
    const studentParent = await prisma.student_parents.findFirst({
      where: {
        parent_id: parentId,
        student_id: childId,
      },
    });

    if (!studentParent) {
      throw new AppError("Unauthorized access to child data", 403);
    }

    const quizzes = await prisma.quizzes.findMany({
      include: {
        quizAssignments: {
          where: { student_id: childId },
        },
      },
    });

    return quizzes.map((q) => {
      const assignment = q.quizAssignments[0];
      return {
        id: q.id,
        title: q.title,
        description: q.description ?? undefined,
        fullMark: q.full_mark,
        obtainedGrade: assignment?.grade,
        status: assignment ? "completed" : "pending",
      };
    });
  }

  async getChildAttendance(
    parentId: number,
    childId: number,
  ): Promise<ParentChildAttendanceDTO[]> {
    // Verify parent-child relationship
    const studentParent = await prisma.student_parents.findFirst({
      where: {
        parent_id: parentId,
        student_id: childId,
      },
    });

    if (!studentParent) {
      throw new AppError("Unauthorized access to child data", 403);
    }

    const attendances = await prisma.attendances.findMany({
      where: { student_id: childId },
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

  async getChildGrades(
    parentId: number,
    childId: number,
  ): Promise<ParentChildGradesDTO> {
    // Verify parent-child relationship
    const studentParent = await prisma.student_parents.findFirst({
      where: {
        parent_id: parentId,
        student_id: childId,
      },
    });

    if (!studentParent) {
      throw new AppError("Unauthorized access to child data", 403);
    }

    const student = await prisma.students.findUnique({
      where: { id: childId },
      include: {
        homework_submissions: true,
        quizAssignments: true,
        attendances: true,
      },
    });

    if (!student) {
      throw new AppError("Child not found", 404);
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

    const presentDays = student.attendances.filter(
      (a) => a.status === "present",
    ).length;

    return {
      childId,
      childName: student.name,
      averageHomeworkGrade,
      averageQuizGrade,
      totalGrade,
      homeworkCount: homeworkGrades.length,
      quizCount: quizGrades.length,
      totalAttendance: student.attendances.length,
      presentDays,
    };
  }

  async unlinkChild(parentId: number, studentParentId: number): Promise<void> {
    const studentParent = await prisma.student_parents.findUnique({
      where: { id: studentParentId },
    });

    if (!studentParent || studentParent.parent_id !== parentId) {
      throw new AppError("Unauthorized operation", 403);
    }

    await prisma.student_parents.delete({
      where: { id: studentParentId },
    });
  }
}

export default ParentService;
