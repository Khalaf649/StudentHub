import { IStudentHomeworkService } from "./interfaces/studentHomework.service.interface.ts";
import prisma from "../lib/prisma.ts";
import { getStudentHomeworkDTO } from "../dtos/studnetHomework.dto.ts";
class StudentHomeworkService implements IStudentHomeworkService {
  async getStudentHomework(
    studentId: number
  ): Promise<getStudentHomeworkDTO[]> {
    const homeworks = await prisma.homework_submissions.findMany({
      where: { student_id: studentId },
      select: {
        id: true,
        grade: true,
        submission_date: true,
        homeworks: {
          select: {
            start_date: true,
            due_date: true,
            description: true,
            title: true,
            full_mark: true,
          },
        },
      },
    });
    return homeworks;
  }
}
export default StudentHomeworkService;
