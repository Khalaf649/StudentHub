import { IAdminService } from "./interfaces/admin.service.interface.ts";
import {
  AdminRegisterUserDTO,
  AdminUpdateUserDTO,
  AdminUserListDTO,
  AdminStatisticsDTO,
} from "../dtos/admin.dto.ts";
import { AppError } from "../errors/AppError.ts";
import prisma from "../lib/prisma.ts";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class AdminService implements IAdminService {
  async registerUser(data: AdminRegisterUserDTO): Promise<void> {
    const { name, email, phone, password, role, section, center_id } = data;

    if (role === "student") {
      if (!section || !center_id) {
        throw new AppError(
          "Section and center_id are required for students",
          400,
        );
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.students.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          section,
          center_id,
        },
      });
    } else if (role === "teacher") {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.teachers.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
        },
      });
    } else if (role === "admin") {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.admins.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
        },
      });
    } else if (role === "parent") {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.parents.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
        },
      });
    } else {
      throw new AppError("Invalid role", 400);
    }
  }

  async getUsers(filters: any): Promise<AdminUserListDTO[]> {
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const skip = (page - 1) * pageSize;

    // For simplicity, showing both students and teachers
    const students = await prisma.students.findMany({
      skip,
      take: pageSize,
      where: filters.center_id
        ? { center_id: Number(filters.center_id) }
        : undefined,
    });

    return students.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      phone: s.phone,
      role: "student",
      createdAt: s.createdAt,
      status: s.deletedAt ? "inactive" : "active",
    }));
  }

  async updateUser(userId: number, data: AdminUpdateUserDTO): Promise<void> {
    // Try updating as student first
    const student = await prisma.students.findUnique({
      where: { id: userId },
    });

    if (student) {
      await prisma.students.update({
        where: { id: userId },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.email && { email: data.email }),
          ...(data.phone && { phone: data.phone }),
          ...(data.section && { section: data.section }),
          ...(data.center_id && { center_id: Number(data.center_id) }),
        } as any,
      });
      return;
    }

    // Try updating as teacher
    const teacher = await prisma.teachers.findUnique({
      where: { id: userId },
    });

    if (teacher) {
      await prisma.teachers.update({
        where: { id: userId },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.email && { email: data.email }),
          ...(data.phone && { phone: data.phone }),
        },
      });
      return;
    }

    throw new AppError("User not found", 404);
  }

  async deleteUser(userId: number): Promise<void> {
    const student = await prisma.students.findUnique({
      where: { id: userId },
    });

    if (student) {
      await prisma.students.update({
        where: { id: userId },
        data: { deletedAt: new Date() },
      });
      return;
    }

    const teacher = await prisma.teachers.findUnique({
      where: { id: userId },
    });

    if (teacher) {
      await prisma.teachers.update({
        where: { id: userId },
        data: { deletedAt: new Date() },
      });
      return;
    }

    throw new AppError("User not found", 404);
  }

  async getStatistics(): Promise<AdminStatisticsDTO> {
    const totalStudents = await prisma.students.count({
      where: { deletedAt: null },
    });

    const totalTeachers = await prisma.teachers.count({
      where: { deletedAt: null },
    });

    const totalCenters = await prisma.centers.count({
      where: { deletedAt: null },
    });

    const totalSessions = await prisma.sessions.count({
      where: { deletedAt: null },
    });

    const totalHomeworks = await prisma.homeworks.count({
      where: { deletedAt: null },
    });

    const totalQuizzes = await prisma.quizzes.count({
      where: { deletedAt: null },
    });

    return {
      totalStudents,
      totalTeachers,
      totalAdmins: 1, // Placeholder
      totalCenters,
      totalSessions,
      totalHomeworks,
      totalQuizzes,
    };
  }

  async generateReport(type: string, filters?: any): Promise<any> {
    if (type === "attendance") {
      const sessions = await prisma.sessions.findMany({
        include: {
          attendances: true,
        },
      });

      return {
        type: "attendance",
        generatedAt: new Date(),
        data: sessions.map((s) => ({
          sessionId: s.id,
          sessionTitle: s.title,
          totalStudents: s.attendances.length,
          presentCount: s.attendances.filter((a) => a.status === "present")
            .length,
          rate:
            s.attendances.length > 0
              ? Math.round(
                  (s.attendances.filter((a) => a.status === "present").length /
                    s.attendances.length) *
                    100 *
                    10,
                ) / 10
              : 0,
        })),
      };
    }

    return { type, generatedAt: new Date(), data: [] };
  }

  async getUserById(userId: number): Promise<any> {
    const student = await prisma.students.findUnique({
      where: { id: userId },
    });

    if (student) {
      return { ...student, role: "student" };
    }

    const teacher = await prisma.teachers.findUnique({
      where: { id: userId },
    });

    if (teacher) {
      return { ...teacher, role: "teacher" };
    }

    throw new AppError("User not found", 404);
  }

  // Parent-Student Linkage Management
  async linkParentToStudent(data: any, adminId: number): Promise<void> {
    const { studentId, parentId, role } = data;

    // Verify student exists
    const student = await prisma.students.findUnique({
      where: { id: studentId },
    });
    if (!student) throw new AppError("Student not found", 404);

    // Verify parent exists
    const parent = await prisma.parents.findUnique({
      where: { id: parentId },
    });
    if (!parent) throw new AppError("Parent not found", 404);

    // Create linkage
    await prisma.student_parents.create({
      data: {
        student_id: studentId,
        parent_id: parentId,
        role,
        status: "active",
        linkedByAdminId: adminId,
        approvedAt: new Date(),
      },
    });
  }

  async unlinkParentFromStudent(
    studentId: number,
    parentId: number,
  ): Promise<void> {
    const linkage = await prisma.student_parents.findFirst({
      where: {
        student_id: studentId,
        parent_id: parentId,
      },
    });

    if (!linkage) {
      throw new AppError("Parent-Student linkage not found", 404);
    }

    // Soft delete by setting status to inactive
    await prisma.student_parents.update({
      where: { id: linkage.id },
      data: { status: "inactive" },
    });
  }

  async getStudentParents(studentId: number): Promise<any[]> {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
    });
    if (!student) throw new AppError("Student not found", 404);

    const parentLinkages = await prisma.student_parents.findMany({
      where: {
        student_id: studentId,
        status: "active",
      },
      include: {
        parents: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return parentLinkages.map((linkage) => ({
      parentId: linkage.parents.id,
      parentName: linkage.parents.name,
      email: linkage.parents.email,
      phone: linkage.parents.phone,
      role: linkage.role,
      status: linkage.status,
      linkedAt: linkage.linkedAt,
    }));
  }

  async getParentStudents(parentId: number): Promise<any[]> {
    const parent = await prisma.parents.findUnique({
      where: { id: parentId },
    });
    if (!parent) throw new AppError("Parent not found", 404);

    const studentLinkages = await prisma.student_parents.findMany({
      where: {
        parent_id: parentId,
        status: "active",
      },
      include: {
        students: {
          select: {
            id: true,
            name: true,
            email: true,
            section: true,
          },
        },
      },
    });

    return studentLinkages.map((linkage) => ({
      studentId: linkage.students.id,
      studentName: linkage.students.name,
      email: linkage.students.email,
      section: linkage.students.section,
      parentRole: linkage.role,
      status: linkage.status,
    }));
  }

  async approvePendingLinkage(
    studentId: number,
    parentId: number,
  ): Promise<void> {
    const linkage = await prisma.student_parents.findFirst({
      where: {
        student_id: studentId,
        parent_id: parentId,
      },
    });

    if (!linkage) {
      throw new AppError("Parent-Student linkage not found", 404);
    }

    await prisma.student_parents.update({
      where: { id: linkage.id },
      data: {
        status: "active",
        approvedAt: new Date(),
      },
    });
  }

  async updateLinkageStatus(
    studentId: number,
    parentId: number,
    data: any,
  ): Promise<void> {
    const linkage = await prisma.student_parents.findFirst({
      where: {
        student_id: studentId,
        parent_id: parentId,
      },
    });

    if (!linkage) {
      throw new AppError("Parent-Student linkage not found", 404);
    }

    await prisma.student_parents.update({
      where: { id: linkage.id },
      data: {
        status: data.status,
      },
    });
  }
}

export default AdminService;
