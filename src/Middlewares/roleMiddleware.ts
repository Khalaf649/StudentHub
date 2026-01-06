import { Response, NextFunction } from "express";
import { AuthRequest } from "../dtos/auth.dto.js";
export default function authorizeRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === role && req.user?.id) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}
