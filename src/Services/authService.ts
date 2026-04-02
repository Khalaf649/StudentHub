import prisma from "../lib/prisma.ts";
import { IAuthService } from "./interfaces/auth.service.interface.ts";
import {
  RegisterStudentDTO,
  RegisterTeacherDTO,
  RegisterAdminDTO,
  RegisterParentDTO,
  LoginDTO,
  TokenDTO,
  LoginResponsetDTO,
} from "../dtos/auth.dto.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user_role } from "../generated/client/enums.ts";
import { AppError } from "../errors/AppError.ts";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "1h";

const roleModelMap: Record<string, any> = {
  [user_role.student]: prisma.students,
  [user_role.teacher]: prisma.teachers,
  [user_role.admin]: prisma.admins,
  parent: prisma.parents,
};

class AuthService implements IAuthService {
  async registerStudent(data: RegisterStudentDTO): Promise<void> {
    const { name, phone, email, password, section, center_id } = data;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await prisma.students.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        section,
        center_id,
      },
    });
  }

  async registerTeacher(data: RegisterTeacherDTO): Promise<void> {
    const { name, phone, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await prisma.teachers.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
      },
    });
  }

  async registerAdmin(data: RegisterAdminDTO): Promise<void> {
    const { name, phone, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await prisma.admins.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
      },
    });
  }

  async registerParent(data: RegisterParentDTO): Promise<void> {
    const { name, phone, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await prisma.parents.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
      },
    });
  }

  async login(data: LoginDTO): Promise<LoginResponsetDTO> {
    const { email, password, role } = data;

    const model = roleModelMap[role];
    if (!model) throw new AppError("Invalid role", 400);

    const user = await model.findUnique({
      where: { email },
    });

    if (!user) throw new AppError("User not found", 404);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid Credentials", 401);
    }

    const tokenPayload: TokenDTO = { id: user.id, role };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const loginResponse: LoginResponsetDTO = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    };

    return loginResponse;
  }
}

export default AuthService;
