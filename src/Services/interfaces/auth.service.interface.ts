import { RegisterStudentDTO, LoginDTO, TokenDTO } from "../../dtos/auth.dto";

export interface IAuthService {
  registerStudent(data: RegisterStudentDTO): Promise<void>;
  login(data: LoginDTO): Promise<string>;
}
