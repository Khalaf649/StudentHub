import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.ts";

export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
