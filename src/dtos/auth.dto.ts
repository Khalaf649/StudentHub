import { user_role, section } from "../generated/client/enums.ts";
import { Request } from "express";

export interface RegisterStudentDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  section: section;
  center_id: number;
}
export interface LoginDTO {
  email: string;
  password: string;
  role: user_role;
}
export interface TokenDTO {
  id: number;
  role: user_role;
}
export interface AuthRequest extends Request {
  user?: TokenDTO;
}
