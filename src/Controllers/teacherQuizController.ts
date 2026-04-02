import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { ITeacherQuizService } from "../Services/interfaces/teacherQuiz.service.interface.ts";
import {
  CreateQuizDTO,
  AssignQuizDTO,
  QuizFilters,
  QuizDTO,
} from "../dtos/teacherQuiz.dto.ts";
import {
  UpdateQuizDTO,
  GradeQuizAssignmentDTO,
} from "../dtos/teacherExtended.dto.ts";
import TeacherQuizService from "../Services/teacherQuizService.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";

class TeacherQuizController {
  constructor(private readonly teacherQuizService: ITeacherQuizService) {}

  async createQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: CreateQuizDTO = req.body;
    try {
      await this.teacherQuizService.createQuiz(requestBody);
      res.status(201).json({ message: "Quiz created successfully" });
    } catch (err) {
      next(err);
    }
  }

  async assignQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: AssignQuizDTO = req.body;
    try {
      await this.teacherQuizService.assignQuiz(requestBody);
      res.status(200).json({ message: "Quiz assigned successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getQuizzes(req: AuthRequest, res: Response, next: NextFunction) {
    const filters: QuizFilters = req.query;
    try {
      const quizzes: QuizDTO[] =
        await this.teacherQuizService.getQuizzes(filters);
      res.status(200).json(quizzes);
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

  async gradeQuizAssignment(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data: GradeQuizAssignmentDTO = req.body;

      await this.teacherQuizService.gradeQuizAssignment(data, req.user?.name);

      res
        .status(200)
        .json(ResponseHandler.success(null, "Quiz graded successfully"));
    } catch (err) {
      next(err);
    }
  }
}

export default TeacherQuizController;
export const teacherQuizController = new TeacherQuizController(
  new TeacherQuizService(),
);
export const createQuiz = teacherQuizController.createQuiz.bind(
  teacherQuizController,
);
export const assignQuiz = teacherQuizController.assignQuiz.bind(
  teacherQuizController,
);
export const getQuizzes = teacherQuizController.getQuizzes.bind(
  teacherQuizController,
);
export const updateQuiz = teacherQuizController.updateQuiz.bind(
  teacherQuizController,
);
export const deleteQuiz = teacherQuizController.deleteQuiz.bind(
  teacherQuizController,
);
export const gradeQuizAssignment =
  teacherQuizController.gradeQuizAssignment.bind(teacherQuizController);
