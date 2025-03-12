import { Request } from "express";
export default interface AuthRequest extends Request {
  user?: { id: bigint; role: "student" | "teacher" };
}


