import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { ITeacherSessionService } from "../Services/interfaces/teacherSession.service.interface.ts";
import {
  createSessionDTO,
  assignSessionDTO,
  SessionFilters,
  getSessionDTO,
} from "../dtos/teacherSession.dto.ts";
import TeacherSessionService from "../Services/teacherSessionService.ts";
import { AppError } from "../errors/AppError.ts";

class TeacherSessionController {
  constructor(private readonly teacherSessionService: ITeacherSessionService) {}

  async createSession(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: createSessionDTO = req.body;
    try {
      await this.teacherSessionService.createSession(requestBody);
      res.status(201).json({ message: "Session created successfully" });
    } catch (err) {
      next(err);
    }
  }

  async assignSession(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: assignSessionDTO = req.body;
    try {
      await this.teacherSessionService.assignSession(requestBody);
      res.status(200).json({ message: "Session assigned successfully" });
    } catch (err) {
      next(err);
    }
  }

  async getSessions(req: AuthRequest, res: Response, next: NextFunction) {
    const filters: SessionFilters = req.query;
    try {
      const sessions: getSessionDTO[] =
        await this.teacherSessionService.getSessions(filters);
      res.status(200).json(sessions);
    } catch (err) {
      next(err);
    }
  }
  async updateSession(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: createSessionDTO = req.body;
    const id: number = parseInt(req.params.id);
    try {
      if (isNaN(id)) {
        throw new AppError("Invalid session ID", 400);
      }
      await this.teacherSessionService.updateSession(requestBody, id);
      res.status(200).json({ message: "Session updated successfully" });
    } catch (err) {
      next(err);
    }
  }
}

const teacherSessionService = new TeacherSessionService();
const teacherSessionController = new TeacherSessionController(
  teacherSessionService,
);

export const createSession = teacherSessionController.createSession.bind(
  teacherSessionController,
);
export const assignSession = teacherSessionController.assignSession.bind(
  teacherSessionController,
);
export const getSessions = teacherSessionController.getSessions.bind(
  teacherSessionController,
);
export const updateSession = teacherSessionController.updateSession.bind(
  teacherSessionController,
);

export default TeacherSessionController;
