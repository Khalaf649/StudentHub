import { Prisma } from "../generated/client/client.ts";
import { AppError } from "../errors/AppError.ts";

export function mapPrismaError(error: any): never {
  // Known DB errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppError("Record already exists", 409);

      case "P2025":
        throw new AppError("Record not found", 404);

      case "P2003":
        throw new AppError("Invalid relation reference", 400);

      case "P2000":
        throw new AppError("Input value too long", 400);

      default:
        throw new AppError("Database request failed", 400);
    }
  }

  // Validation (developer mistake or bad request)
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new AppError("Invalid query parameters", 400);
  }

  // Unknown Prisma
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new AppError("Database error", 500);
  }

  // Not Prisma → rethrow
  throw error;
}
