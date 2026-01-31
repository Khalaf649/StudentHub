import {
  RegisterStudentDTO,
  LoginDTO,
  LoginResponsetDTO,
} from "../../dtos/auth.dto.ts";

export interface IAuthService {
  registerStudent(data: RegisterStudentDTO): Promise<void>;
  login(data: LoginDTO): Promise<LoginResponsetDTO>;
}
