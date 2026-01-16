import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../Services/interfaces/auth.service.interface.ts";
import { RegisterStudentDTO, LoginDTO } from "../dtos/auth.dto.ts";
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

  async login(req: Request, res: Response, next: NextFunction) {
    const requestBody: LoginDTO = req.body;
    try {
      const token = await this.authService.login(requestBody);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
const authService = new AuthService();
const authController = new AuthController(authService);
export const registerStudent =
  authController.registerStudent.bind(authController);
export const login = authController.login.bind(authController);

export default AuthController;
