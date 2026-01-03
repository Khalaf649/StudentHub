import { Router } from "express";
import {
  createSession,
  assignSession,
  getSessions,
} from "../Controllers/teacherSessionController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import SessionValidator from "../Validation/SessionValidator";
import validateStudentSession from "../Validation/StudentSessionValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", SessionValidator, validationMiddleware, createSession);
router.post(
  "/assign",
  validateStudentSession,
  validationMiddleware,
  assignSession
);
router.get("/", getSessions);

export default router;
