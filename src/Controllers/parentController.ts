import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { IParentService } from "../Services/interfaces/parent.service.interface.ts";
import ParentService from "../Services/parentService.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";

class ParentController {
  constructor(private readonly parentService: IParentService) {}

  async getLinkedChildren(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parentId = req.user?.id as number;

      const children = await this.parentService.getLinkedChildren(parentId);
      res.status(200).json(ResponseHandler.success(children));
    } catch (err) {
      next(err);
    }
  }

  async getChildHomeworks(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parentId = req.user?.id as number;
      const childId = Number(req.params.childId);

      const homeworks = await this.parentService.getChildHomeworks(
        parentId,
        childId,
      );
      res.status(200).json(ResponseHandler.success(homeworks));
    } catch (err) {
      next(err);
    }
  }

  async getChildQuizzes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parentId = req.user?.id as number;
      const childId = Number(req.params.childId);

      const quizzes = await this.parentService.getChildQuizzes(
        parentId,
        childId,
      );
      res.status(200).json(ResponseHandler.success(quizzes));
    } catch (err) {
      next(err);
    }
  }

  async getChildAttendance(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const parentId = req.user?.id as number;
      const childId = Number(req.params.childId);

      const attendance = await this.parentService.getChildAttendance(
        parentId,
        childId,
      );
      res.status(200).json(ResponseHandler.success(attendance));
    } catch (err) {
      next(err);
    }
  }

  async getChildGrades(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parentId = req.user?.id as number;
      const childId = Number(req.params.childId);

      const grades = await this.parentService.getChildGrades(parentId, childId);
      res.status(200).json(ResponseHandler.success(grades));
    } catch (err) {
      next(err);
    }
  }

  async unlinkChild(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parentId = req.user?.id as number;
      const studentParentId = Number(req.params.linkId);

      await this.parentService.unlinkChild(parentId, studentParentId);
      res
        .status(200)
        .json(ResponseHandler.success(null, "Child unlinked successfully"));
    } catch (err) {
      next(err);
    }
  }
}

const parentService = new ParentService();
const parentController = new ParentController(parentService);

export const getLinkedChildren =
  parentController.getLinkedChildren.bind(parentController);
export const getChildHomeworks =
  parentController.getChildHomeworks.bind(parentController);
export const getChildQuizzes =
  parentController.getChildQuizzes.bind(parentController);
export const getChildAttendance =
  parentController.getChildAttendance.bind(parentController);
export const getChildGrades =
  parentController.getChildGrades.bind(parentController);
export const unlinkChild = parentController.unlinkChild.bind(parentController);

export default ParentController;
