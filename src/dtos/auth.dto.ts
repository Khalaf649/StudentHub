import { Section } from "../../generated/prisma/enums";
import Role from "../constants/roles";

export interface RegisterStudentDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  section: Section;
  center_id: number;
}
export interface LoginDTO {
  email: string;
  password: string;
  role: Role;
}
export interface TokenDTO {
  id: number;
  role: Role;
}
