import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { ITeacherHomeworkService } from "../Services/interfaces/teacherHomework.service.interface.ts";
import {
  CreateHomeworkDTO,
  AssignHomeworkDTO,
  HomeworkFilters,
  HomeworkDTO,
} from "../dtos/teacherHomework.dto.ts";
import {
  UpdateHomeworkDTO,
  GradeHomeworkSubmissionDTO,
} from "../dtos/teacherExtended.dto.ts";
import TeacherHomeworkService from "../Services/teacherHomeworkService.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";

class TeacherHomeworkController {
  constructor(
    private readonly teacherHomeworkService: ITeacherHomeworkService,
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

  async updateHomework(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const homeworkId = Number(req.params.id);
      const data: UpdateHomeworkDTO = req.body;

      await this.teacherHomeworkService.updateHomework(homeworkId, data);

      res
        .status(200)
        .json(ResponseHandler.success(null, "Homework updated successfully"));
    } catch (err) {
      next(err);
    }
  }

  async deleteHomework(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const homeworkId = Number(req.params.id);

      await this.teacherHomeworkService.deleteHomework(homeworkId);

      res
        .status(200)
        .json(ResponseHandler.success(null, "Homework deleted successfully"));
    } catch (err) {
      next(err);
    }
  }

  async gradeHomeworkSubmission(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data: GradeHomeworkSubmissionDTO = req.body;

      await this.teacherHomeworkService.gradeHomeworkSubmission(
        data,
        req.user?.name,
      );

      res
        .status(200)
        .json(ResponseHandler.success(null, "Homework graded successfully"));
    } catch (err) {
      next(err);
    }
  }
}

const teacherHomeworkService = new TeacherHomeworkService();
const teacherHomeworkController = new TeacherHomeworkController(
  teacherHomeworkService,
);

export const createHomework = teacherHomeworkController.createHomework.bind(
  teacherHomeworkController,
);
export const assignHomework = teacherHomeworkController.assignHomework.bind(
  teacherHomeworkController,
);
export const getHomeworks = teacherHomeworkController.getHomeworks.bind(
  teacherHomeworkController,
);
export const updateHomework = teacherHomeworkController.updateHomework.bind(
  teacherHomeworkController,
);
export const deleteHomework = teacherHomeworkController.deleteHomework.bind(
  teacherHomeworkController,
);
export const gradeHomeworkSubmission =
  teacherHomeworkController.gradeHomeworkSubmission.bind(
    teacherHomeworkController,
  );

export default TeacherHomeworkController;
