import { Request, Response, NextFunction } from "express";
import AuthRequest from "../Interfaces/AuthRequest";
import { ITeacherStudentService } from "../Services/interfaces/teacherStudnet.service.interface";
import { StudentFilters, StudentDTO } from "../dtos/teacherStudent.dto";
import TeacherStudentService from "../Services/teacherStudentService";

class TeacherStudentController {
  constructor(private readonly teacherStudentService: ITeacherStudentService) {}

  async getStudents(req: AuthRequest, res: Response, next: NextFunction) {
    const filters: StudentFilters = req.query;
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
  teacherStudentService
);

export const getStudents = teacherStudentController.getStudents.bind(
  teacherStudentController
);

export default TeacherStudentController;
