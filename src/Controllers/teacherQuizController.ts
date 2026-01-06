import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.js";
import { ITeacherQuizService } from "../Services/interfaces/teacherQuiz.service.interface.js";
import {
  CreateQuizDTO,
  AssignQuizDTO,
  QuizFilters,
  QuizDTO,
} from "../dtos/teacherQuiz.dto.js";
import TeacherQuizService from "../Services/teacherQuizService.js";

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
      const quizzes: QuizDTO[] = await this.teacherQuizService.getQuizzes(
        filters
      );
      res.status(200).json(quizzes);
    } catch (err) {
      next(err);
    }
  }
}

export default TeacherQuizController;
export const teacherQuizController = new TeacherQuizController(
  new TeacherQuizService()
);
export const createQuiz = teacherQuizController.createQuiz.bind(
  teacherQuizController
);
export const assignQuiz = teacherQuizController.assignQuiz.bind(
  teacherQuizController
);
export const getQuizzes = teacherQuizController.getQuizzes.bind(
  teacherQuizController
);
