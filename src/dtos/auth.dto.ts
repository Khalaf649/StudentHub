import { user_role, section, parent_role } from "../generated/client/enums.ts";
import { Request } from "express";

export interface RegisterStudentDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  section: section;
  center_id: number;
}

export interface RegisterTeacherDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterAdminDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterParentDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginResponsetDTO {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: user_role | "parent";
  };
}

export interface LoginDTO {
  email: string;
  password: string;
  role: user_role | "parent";
}

export interface TokenDTO {
  id: number;
  role: user_role | "parent";
  name?: string;
}

export interface AuthRequest extends Request {
  user?: TokenDTO;
}
