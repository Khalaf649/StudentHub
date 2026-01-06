import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.js";
import { IStudentInfoService } from "../Services/interfaces/studentInfo.service.interface.js";
import { IStudentHomeworkService } from "../Services/interfaces/studentHomework.service.interface.js";
import { IStudentQuizService } from "../Services/interfaces/studentQuiz.service.interface.js";
import { IStudentSessionService } from "../Services/interfaces/StudentSession.service.interface.js";
import { IStudentParentService } from "../Services/interfaces/studentParent.service.interface.js";
import { createStudentParentDTO } from "../dtos/studentParent.dto.js";
import StudentInfoService from "../Services/studentInfoService.js";
import StudentHomeworkService from "../Services/studentHomeworkService.js";
import StudentQuizService from "../Services/studentQuizService.js";
import StudentSessionService from "../Services/studentSessionService.js";
import StudentParentService from "../Services/studentParentService.js";

class StudentController {
  constructor(
    private readonly studentInfoService: IStudentInfoService,
    private readonly studentHomeworkService: IStudentHomeworkService,
    private readonly studentQuizService: IStudentQuizService,
    private readonly studentSessionService: IStudentSessionService,
    private readonly studentParentService: IStudentParentService
  ) {}

  async getStudentInfo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user!.id;
      const studentInfo = await this.studentInfoService.getStudentInfo(
        studentId
      );
      res.status(200).json(studentInfo);
    } catch (err) {
      next(err);
    }
  }

  async getStudentHomeworks(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = req.user!.id;
      const homeworks = await this.studentHomeworkService.getStudentHomework(
        studentId
      );
      res.status(200).json(homeworks);
    } catch (err) {
      next(err);
    }
  }

  async getStudentQuizzes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user!.id;
      const quizzes = await this.studentQuizService.getStudentQuizzes(
        studentId
      );
      res.status(200).json(quizzes);
    } catch (err) {
      next(err);
    }
  }

  async getStudentSessions(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const studentId = req.user!.id;
      const sessions = await this.studentSessionService.getStudentSessions(
        studentId
      );
      res.status(200).json(sessions);
    } catch (err) {
      next(err);
    }
  }

  async createStudentParent(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const requestBody: createStudentParentDTO = req.body;
    try {
      const studentId = req.user!.id;
      await this.studentParentService.createStudentParent(
        studentId,
        requestBody
      );
      res.status(201).json({ message: "Parent created successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getStudentParents(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user!.id;
      const parents = await this.studentParentService.getStudentParents(
        studentId
      );
      res.status(200).json(parents);
    } catch (err) {
      next(err);
    }
  }
}

const studentInfoService = new StudentInfoService();
const studentHomeworkService = new StudentHomeworkService();
const studentQuizService = new StudentQuizService();
const studentSessionService = new StudentSessionService();
const studentParentService = new StudentParentService();

const studentController = new StudentController(
  studentInfoService,
  studentHomeworkService,
  studentQuizService,
  studentSessionService,
  studentParentService
);

export const getStudentInfo =
  studentController.getStudentInfo.bind(studentController);
export const getStudentHomeworks =
  studentController.getStudentHomeworks.bind(studentController);
export const getStudentQuizzes =
  studentController.getStudentQuizzes.bind(studentController);
export const getStudentSessions =
  studentController.getStudentSessions.bind(studentController);
export const createStudentParent =
  studentController.createStudentParent.bind(studentController);
export const getStudentParents =
  studentController.getStudentParents.bind(studentController);

export default StudentController;
