import { RegisterStudentDTO, LoginDTO, TokenDTO } from "../../dtos/auth.dto.js";

export interface IAuthService {
  registerStudent(data: RegisterStudentDTO): Promise<void>;
  login(data: LoginDTO): Promise<string>;
}
