import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, TokenDTO } from "../dtos/auth.dto.ts";
const JWT_SECRET = process.env.JWT_SECRET as string;
// Middleware to authenticate and differentiate roles
export default (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenDTO;
    req.user = { id: decoded.id, role: decoded.role }; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
