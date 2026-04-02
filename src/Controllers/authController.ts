import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../Services/interfaces/auth.service.interface.ts";
import {
  RegisterStudentDTO,
  RegisterTeacherDTO,
  RegisterAdminDTO,
  RegisterParentDTO,
  LoginDTO,
} from "../dtos/auth.dto.ts";
import AuthService from "../Services/authService.ts";

class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async registerStudent(req: Request, res: Response, next: NextFunction) {
    const requestBody: RegisterStudentDTO = req.body;
    try {
      await this.authService.registerStudent(requestBody);
      res.status(201).json({ message: "Student registered successfully" });
    } catch (err) {
      next(err);
    }
  }

  async registerTeacher(req: Request, res: Response, next: NextFunction) {
    const requestBody: RegisterTeacherDTO = req.body;
    try {
      await (this.authService as any).registerTeacher(requestBody);
      res.status(201).json({ message: "Teacher registered successfully" });
    } catch (err) {
      next(err);
    }
  }

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    const requestBody: RegisterAdminDTO = req.body;
    try {
      await (this.authService as any).registerAdmin(requestBody);
      res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
      next(err);
    }
  }

  async registerParent(req: Request, res: Response, next: NextFunction) {
    const requestBody: RegisterParentDTO = req.body;
    try {
      await (this.authService as any).registerParent(requestBody);
      res.status(201).json({ message: "Parent registered successfully" });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const requestBody: LoginDTO = req.body;
    try {
      const loginResponse = await this.authService.login(requestBody);
      res.status(200).json(loginResponse);
    } catch (err) {
      next(err);
    }
  }
}

const authService = new AuthService();
const authController = new AuthController(authService);

export const registerStudent =
  authController.registerStudent.bind(authController);
export const registerTeacher =
  authController.registerTeacher.bind(authController);
export const registerAdmin = authController.registerAdmin.bind(authController);
export const registerParent =
  authController.registerParent.bind(authController);
export const login = authController.login.bind(authController);

export default AuthController;
