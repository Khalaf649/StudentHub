import { Request } from "express";
import tokenPayload from "./TokenPayload";
export default interface AuthRequest extends Request {
  user?: tokenPayload;
}
