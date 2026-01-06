import { AuthRequest } from "../dtos/auth.dto.js";
import { Request, Response, NextFunction } from "express";
import { ITeacherCenterService } from "../Services/interfaces/teacherCenter.service.interface.js";
import { CreateCenterDTO, getCenterDTO } from "../dtos/teacherCenter.dto.js";
import TeacherCenterService from "../Services/teacherCenterService.js";

class TeacherCenterController {
  constructor(
    private readonly teacherControllerService: ITeacherCenterService
  ) {}

  async createCenter(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: CreateCenterDTO = req.body;
    try {
      await this.teacherControllerService.createCenter(requestBody);
      res.status(201).json("Center created successfully");
    } catch (err) {
      next(err);
    }
  }

  async getCenters(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const centers: getCenterDTO[] =
        await this.teacherControllerService.getCenters();
      res.status(200).json(centers);
    } catch (err) {
      next(err);
    }
  }
}

export default TeacherCenterController;
const teacherCenterService = new TeacherCenterService();
const teacherCenterController = new TeacherCenterController(
  teacherCenterService
);
export const createCenter = teacherCenterController.createCenter.bind(
  teacherCenterController
);
export const getCenters = teacherCenterController.getCenters.bind(
  teacherCenterController
);
