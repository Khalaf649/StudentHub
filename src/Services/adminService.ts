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
    } else if (role === "teacher" || role === "admin") {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.teachers.create({
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
}

export default AdminService;
