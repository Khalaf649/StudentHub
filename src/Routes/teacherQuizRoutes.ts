import { Router } from "express";
import {
  createQuiz,
  assignQuiz,
  getQuizzes,
} from "../Controllers/teacherQuizController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import QuizValidator from "../Validation/quizValidator.js";
import StudentQuizValidator from "../Validation/studentQuizValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", QuizValidator, validationMiddleware, createQuiz);
router.post("/assign", StudentQuizValidator, validationMiddleware, assignQuiz);
router.get("/", getQuizzes);

export default router;
