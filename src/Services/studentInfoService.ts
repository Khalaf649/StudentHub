import { IStudentInfoService } from "./interfaces/studentInfo.service.interface.js";
import { getStudentInfoDTO } from "../dtos/studentInfo.dto.js";
import prisma from "../lib/prisma.js";

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
      throw new Error("Student not found");
    }
    return student;
  }
}
export default StudentInfoService;
