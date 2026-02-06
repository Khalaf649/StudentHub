import { IStudentInfoService } from "./interfaces/studentInfo.service.interface.ts";
import { getStudentInfoDTO } from "../dtos/studentInfo.dto.ts";
import { AppError } from "../errors/AppError.ts";
import prisma from "../lib/prisma.ts";

class StudentInfoService implements IStudentInfoService {
  async getStudentInfo(studentId: number): Promise<getStudentInfoDTO> {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        section: true,
        centers: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!student) {
      throw new AppError("Student not found", 404);
    }
    return student;
  }
}
export default StudentInfoService;
