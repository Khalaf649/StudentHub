import { ITeacherSessionService } from "../Services/interfaces/teacherSession.service.interface";
import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
class teacherSessionController {
  constructor(private teacherSessionService: ITeacherSessionService) {}

  async createSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, description, center_id, section, session_datetime } =
        req.body;
      await this.teacherSessionService.createSession({
        title,
        description,
        center_id,
        section,
        session_datetime,
      });
      res.status(201).json({ message: "Session created successfully" });
    } catch (error) {
      next(error);
    }
  }
}
