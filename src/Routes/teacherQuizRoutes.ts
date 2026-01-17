import { Router } from "express";
import {
  createQuiz,
  assignQuiz,
  getQuizzes,
} from "../Controllers/teacherQuizController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import { quizValidator } from "../Validations/quizValidator.ts";
import { studentQuizValidator } from "../Validations/studentQuizValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", quizValidator, validationMiddleware, createQuiz);
router.post("/assign", studentQuizValidator, validationMiddleware, assignQuiz);
router.get("/", getQuizzes);

export default router;
