import { ITeacherSessionService } from "../Services/interfaces/teacherSession.service.interface";
import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import { createSessionDTO, assignSessionDTO } from "../dtos/teacherSession.dto";
class teacherSessionController {
  constructor(private teacherSessionService: ITeacherSessionService) {}

  async createSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const requestBody: createSessionDTO = req.body;
      await this.teacherSessionService.createSession(requestBody);
      res.status(201).json({ message: "Session created successfully" });
    } catch (error) {
      next(error);
    }
  }
  async assignSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const requestBody: assignSessionDTO = req.body;
      await this.teacherSessionService.assignSession(requestBody);
      res.status(201).json({ message: "Session assigned successfully" });
    } catch (error) {
      next(error);
    }
  }
}
