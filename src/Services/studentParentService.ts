// services/studentParent.service.ts
import { IStudentParentService } from "./interfaces/studentParent.service.interface.js";
import prisma from "../lib/prisma.js";
import {
  createStudentParentDTO,
  getStudentParentsDTO,
} from "../dtos/studentParent.dto.js";

class StudentParentService implements IStudentParentService {
  async createStudentParent(
    studentId: number,
    data: createStudentParentDTO
  ): Promise<void> {
    const { name, phone, relationship } = data;

    // Create the parent
    const parent = await prisma.parents.create({
      data: {
        name,
        phone,
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
          },
        },
      },
    });
  }
}

export default StudentParentService;
