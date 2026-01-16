import { Router } from "express";
import {
  createQuiz,
  assignQuiz,
  getQuizzes,
} from "../Controllers/teacherQuizController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import QuizValidator from "../Validation/quizValidator.ts";
import StudentQuizValidator from "../Validation/studentQuizValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", QuizValidator, validationMiddleware, createQuiz);
router.post("/assign", StudentQuizValidator, validationMiddleware, assignQuiz);
router.get("/", getQuizzes);

export default router;
