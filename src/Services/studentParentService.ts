// services/studentParent.service.ts
import { IStudentParentService } from "./interfaces/studentParent.service.interface.ts";
import prisma from "../lib/prisma.ts";
import {
  createStudentParentDTO,
  getStudentParentsDTO,
} from "../dtos/studentParent.dto.ts";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

class StudentParentService implements IStudentParentService {
  async createStudentParent(
    studentId: number,
    data: createStudentParentDTO,
  ): Promise<void> {
    const { name, phone, relationship, email, password } = data as any;

    // Email and password are now required for parent authentication
    if (!email || !password) {
      throw new Error("Email and password are required for parent creation");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the parent
    const parent = await prisma.parents.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
      },
    });

    // Link the parent to the student
    await prisma.student_parents.create({
      data: {
        student_id: studentId,
        parent_id: parent.id,
        role: relationship, // parent_role enum
      },
    });
  }
  async getStudentParents(studentId: number): Promise<getStudentParentsDTO[]> {
    return prisma.student_parents.findMany({
      where: { student_id: studentId },
      select: {
        role: true,
        parents: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });
  }
}

export default StudentParentService;
