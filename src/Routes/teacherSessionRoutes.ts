import { Router } from "express";
import {
  createSession,
  assignSession,
  getSessions,
  updateSession,
} from "../Controllers/teacherSessionController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import { sessionValidator } from "../Validations/sessionValidator.ts";
import { studentSessionValidator } from "../Validations/studentSessionValidator.ts";
// import validateStudentSession from "../validation/studentSessionValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", sessionValidator, validationMiddleware, createSession);
router.post(
  "/assign",
  studentSessionValidator,
  validationMiddleware,
  assignSession,
);
router.get("/", getSessions);
router.put("/:id", sessionValidator, validationMiddleware, updateSession);

export default router;
