import { Request, Response } from "express";
import authMiddleware from "./authMiddleware";
import authorizeRole from "./roleMiddleware";

const graphqlMiddleware = async (req: Request, res: Response) => {
  // Wrap authMiddleware
  await new Promise<void>((resolve, reject) => {
    authMiddleware(req as any, res as any, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Wrap roleMiddleware for teacher
  await new Promise<void>((resolve, reject) => {
    authorizeRole("teacher")(req as any, res as any, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Now req.user is available
  return { user: (req as any).user };
};
export default graphqlMiddleware;
