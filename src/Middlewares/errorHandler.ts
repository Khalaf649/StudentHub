import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.ts";
import { mapPrismaError } from "../utils/prismaErrorMapper.ts";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // map Prisma errors to AppError
    mapPrismaError(err);
  } catch (mapped) {
    err = mapped;
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
  });
}
