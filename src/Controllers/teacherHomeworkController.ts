import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.js";
import { ITeacherHomeworkService } from "../Services/interfaces/teacherHomework.service.interface.js";
import {
  CreateHomeworkDTO,
  AssignHomeworkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../dtos/teacherHomework.dto.js";
import TeacherHomeworkService from "../Services/teacherHomeworkService.js";

class TeacherHomeworkController {
  constructor(
    private readonly teacherHomeworkService: ITeacherHomeworkService
  ) {}

  async createHomework(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: CreateHomeworkDTO = req.body;
    try {
      await this.teacherHomeworkService.createHomework(requestBody);
      res.status(201).json({ message: "Homework created successfully" });
    } catch (err) {
      next(err);
    }
  }

  async assignHomework(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: AssignHomeworkDTO = req.body;
    try {
      await this.teacherHomeworkService.assignHomework(requestBody);
      res.status(200).json({ message: "Homework assigned successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getHomeworks(req: AuthRequest, res: Response, next: NextFunction) {
    const filters: HomeworkFilters = req.query;
    try {
      const homeworks: HomeworkDTO[] =
        await this.teacherHomeworkService.getHomeworks(filters);
      res.status(200).json(homeworks);
    } catch (err) {
      next(err);
    }
  }
}

const teacherHomeworkService = new TeacherHomeworkService();
const teacherHomeworkController = new TeacherHomeworkController(
  teacherHomeworkService
);

export const createHomework = teacherHomeworkController.createHomework.bind(
  teacherHomeworkController
);
export const assignHomework = teacherHomeworkController.assignHomework.bind(
  teacherHomeworkController
);
export const getHomeworks = teacherHomeworkController.getHomeworks.bind(
  teacherHomeworkController
);

export default TeacherHomeworkController;
