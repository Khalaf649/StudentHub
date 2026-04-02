import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.ts";
import { IStudentProfileService } from "../Services/interfaces/studentProfile.service.interface.ts";
import {
  UpdateStudentProfileDTO,
  ChangePasswordDTO,
} from "../dtos/studentProfile.dto.ts";
import StudentProfileService from "../Services/studentProfileService.ts";
import { ResponseHandler } from "../utils/responseWrapper.ts";

class StudentProfileController {
  constructor(private readonly studentProfileService: IStudentProfileService) {}

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;
      const data: UpdateStudentProfileDTO = req.body;

      await this.studentProfileService.updateProfile(studentId, data);
      res
        .status(200)
        .json(ResponseHandler.success(null, "Profile updated successfully"));
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;
      const data: ChangePasswordDTO = req.body;

      await this.studentProfileService.changePassword(studentId, data);
      res
        .status(200)
        .json(ResponseHandler.success(null, "Password changed successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getGrades(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;

      const grades = await this.studentProfileService.getGrades(studentId);
      res.status(200).json(ResponseHandler.success(grades));
    } catch (err) {
      next(err);
    }
  }

  async getAttendance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;

      const attendance =
        await this.studentProfileService.getAttendance(studentId);
      res.status(200).json(ResponseHandler.success(attendance));
    } catch (err) {
      next(err);
    }
  }

  async getHomeworkDetail(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;
      const homeworkId = Number(req.params.id);

      const homework = await this.studentProfileService.getHomeworkDetails(
        studentId,
        homeworkId,
      );
      res.status(200).json(ResponseHandler.success(homework));
    } catch (err) {
      next(err);
    }
  }

  async getQuizDetail(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;
      const quizId = Number(req.params.id);

      const quiz = await this.studentProfileService.getQuizDetails(
        studentId,
        quizId,
      );
      res.status(200).json(ResponseHandler.success(quiz));
    } catch (err) {
      next(err);
    }
  }

  async deleteAccount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const studentId = req.user?.id as number;

      await this.studentProfileService.deleteAccount(studentId);
      res
        .status(200)
        .json(ResponseHandler.success(null, "Account deleted successfully"));
    } catch (err) {
      next(err);
    }
  }
}

const studentProfileService = new StudentProfileService();
const studentProfileController = new StudentProfileController(
  studentProfileService,
);

export const updateProfile = studentProfileController.updateProfile.bind(
  studentProfileController,
);
export const changePassword = studentProfileController.changePassword.bind(
  studentProfileController,
);
export const getGrades = studentProfileController.getGrades.bind(
  studentProfileController,
);
export const getAttendance = studentProfileController.getAttendance.bind(
  studentProfileController,
);
export const getHomeworkDetail =
  studentProfileController.getHomeworkDetail.bind(studentProfileController);
export const getQuizDetail = studentProfileController.getQuizDetail.bind(
  studentProfileController,
);
export const deleteAccount = studentProfileController.deleteAccount.bind(
  studentProfileController,
);

export default StudentProfileController;
