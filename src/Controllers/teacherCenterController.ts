import { AuthRequest } from "../dtos/auth.dto.ts";
import { Request, Response, NextFunction } from "express";
import { ITeacherCenterService } from "../Services/interfaces/teacherCenter.service.interface.ts";
import {
  CreateCenterDTO,
  getCenterDTO,
  UpdateCenterDTO,
  GetCenterNameOnlyDTO,
} from "../dtos/teacherCenter.dto.ts";
import TeacherCenterService from "../Services/teacherCenterService.ts";

class TeacherCenterController {
  constructor(
    private readonly teacherControllerService: ITeacherCenterService,
  ) {}

  async createCenter(req: AuthRequest, res: Response, next: NextFunction) {
    const requestBody: CreateCenterDTO = req.body;
    try {
      await this.teacherControllerService.createCenter(requestBody);
      res.status(201).json({ message: "Center created successfully" });
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

  async getCentersNameOnly(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const centers: GetCenterNameOnlyDTO[] =
        await this.teacherControllerService.getCentersNameOnly();
      res.status(200).json(centers);
    } catch (err) {
      next(err);
    }
  }

  async updateCenter(req: AuthRequest, res: Response, next: NextFunction) {
    const centerId = parseInt(req.params.id);
    const requestBody: UpdateCenterDTO = req.body;
    try {
      await this.teacherControllerService.updateCenter(centerId, requestBody);
      res.status(200).json({ message: "Center updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  async deleteCenter(req: AuthRequest, res: Response, next: NextFunction) {
    const centerId = parseInt(req.params.id);
    try {
      await this.teacherControllerService.deleteCenter(centerId);
      res.status(200).json({ message: "Center deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

export default TeacherCenterController;
const teacherCenterService = new TeacherCenterService();
const teacherCenterController = new TeacherCenterController(
  teacherCenterService,
);
export const createCenter = teacherCenterController.createCenter.bind(
  teacherCenterController,
);
export const getCenters = teacherCenterController.getCenters.bind(
  teacherCenterController,
);
export const getCentersNameOnly =
  teacherCenterController.getCentersNameOnly.bind(teacherCenterController);
export const updateCenter = teacherCenterController.updateCenter.bind(
  teacherCenterController,
);
export const deleteCenter = teacherCenterController.deleteCenter.bind(
  teacherCenterController,
);
