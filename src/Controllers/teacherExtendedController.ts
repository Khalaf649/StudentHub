import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import {
  UpdateHomeworkDTO,
  UpdateQuizDTO,
} from "../dtos/teacherExtended.dto.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";
import { ITeacherHomeworkService } from "../Services/interfaces/teacherHomework.service.interface.ts";
import { ITeacherQuizService } from "../Services/interfaces/teacherQuiz.service.interface.ts";
import { ITeacherExtendedService } from "../Services/interfaces/teacherExtended.service.interface.ts";
import TeacherHomeworkService from "../Services/teacherHomeworkService.ts";
import TeacherQuizService from "../Services/teacherQuizService.ts";
import TeacherExtendedService from "../Services/teacherExtendedService.ts";

class TeacherExtendedController {
  constructor(
    private readonly teacherHomeworkService: ITeacherHomeworkService,
    private readonly teacherQuizService: ITeacherQuizService,
    private readonly teacherExtendedService: ITeacherExtendedService,
  ) {}

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

  async updateQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);
      const data: UpdateQuizDTO = req.body;

      await this.teacherQuizService.updateQuiz(quizId, data);

      res
        .status(200)
        .json(ResponseHandler.success(null, "Quiz updated successfully"));
    } catch (err) {
      next(err);
    }
  }

  async deleteQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const quizId = Number(req.params.id);

      await this.teacherQuizService.deleteQuiz(quizId);

      res
        .status(200)
        .json(ResponseHandler.success(null, "Quiz deleted successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getStudentPerformance(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const studentId = Number(req.params.studentId);

      const performance =
        await this.teacherExtendedService.getStudentPerformance(studentId);

      res.status(200).json(ResponseHandler.success(performance));
    } catch (err) {
      next(err);
    }
  }

  async getAttendanceAnalytics(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const sessionId = Number(req.params.sessionId);

      const analytics =
        await this.teacherExtendedService.getAttendanceAnalytics(sessionId);

      res.status(200).json(ResponseHandler.success(analytics));
    } catch (err) {
      next(err);
    }
  }
}

const teacherHomeworkService = new TeacherHomeworkService();
const teacherQuizService = new TeacherQuizService();
const teacherExtendedService = new TeacherExtendedService();

const teacherExtendedController = new TeacherExtendedController(
  teacherHomeworkService,
  teacherQuizService,
  teacherExtendedService,
);

export const updateHomework = teacherExtendedController.updateHomework.bind(
  teacherExtendedController,
);
export const deleteHomework = teacherExtendedController.deleteHomework.bind(
  teacherExtendedController,
);
export const updateQuiz = teacherExtendedController.updateQuiz.bind(
  teacherExtendedController,
);
export const deleteQuiz = teacherExtendedController.deleteQuiz.bind(
  teacherExtendedController,
);
export const getStudentPerformance =
  teacherExtendedController.getStudentPerformance.bind(
    teacherExtendedController,
  );
export const getAttendanceAnalytics =
  teacherExtendedController.getAttendanceAnalytics.bind(
    teacherExtendedController,
  );

export default TeacherExtendedController;
