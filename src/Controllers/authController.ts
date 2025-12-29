import { IAuthService } from "../Services/interfaces/auth.service.interface";
import { Request, Response, NextFunction } from "express";
import { RegisterStudentDTO, LoginDTO } from "../dtos/auth.dto";
class AuthController {
  constructor(private authService: IAuthService) {}
  async registerStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody: RegisterStudentDTO = req.body;
      await this.authService.registerStudent(requestBody);
      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const requestBody: LoginDTO = req.body;
      const token = await this.authService.login(requestBody);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
export default AuthController;
