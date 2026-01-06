import { Router } from "express";
import {
  createSession,
  assignSession,
  getSessions,
} from "../Controllers/teacherSessionController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import SessionValidator from "../Validation/SessionValidator.js";
import validateStudentSession from "../Validation/StudentSessionValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

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
