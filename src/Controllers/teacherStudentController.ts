import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { ITeacherStudentService } from "../Services/interfaces/teacherStudnet.service.interface.ts";
import { StudentFilters, StudentDTO } from "../dtos/teacherStudent.dto.ts";
import TeacherStudentService from "../Services/teacherStudentService.ts";

class TeacherStudentController {
  constructor(private readonly teacherStudentService: ITeacherStudentService) {}

  async getStudents(req: AuthRequest, res: Response, next: NextFunction) {
    const filters: any = req.query;
    try {
      const students: StudentDTO[] =
        await this.teacherStudentService.getStudents(filters);
      res.status(200).json(students);
    } catch (err) {
      next(err);
    }
  }
}

const teacherStudentService = new TeacherStudentService();
const teacherStudentController = new TeacherStudentController(
  teacherStudentService,
);

export const getStudents = teacherStudentController.getStudents.bind(
  teacherStudentController,
);

export default TeacherStudentController;
