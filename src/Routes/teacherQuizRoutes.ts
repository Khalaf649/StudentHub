import { Router } from "express";
import {
  createQuiz,
  assignQuiz,
  getQuizzes,
} from "../Controllers/teacherQuizController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import QuizValidator from "../Validation/QuizValidator";
import StudentQuizValidator from "../Validation/StudentQuizValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", QuizValidator, validationMiddleware, createQuiz);
router.post("/assign", StudentQuizValidator, validationMiddleware, assignQuiz);
router.get("/", getQuizzes);

export default router;
