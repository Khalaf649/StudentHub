import prisma from "../lib/prisma";
import { IAuthService } from "./interfaces/auth.service.interface";
import { RegisterStudentDTO, LoginDTO, TokenDTO } from "../dtos/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenPayload from "../Interfaces/TokenPayload";
import Role from "../constants/roles";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "1h";
const roleModelMap: Record<Role, any> = {
  [Role.STUDENT]: prisma.students,
  [Role.TEACHER]: prisma.teachers,
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

  async login(data: LoginDTO): Promise<string> {
    const { email, password, role } = data;

    const model = roleModelMap[role as Role];
    if (!model) throw new Error("Invalid role");
    const user = await model.findUnique({
      where: { email },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    const tokenPayload: TokenDTO = { id: user.id, role: role };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return token;
  }
}

export default AuthService;
