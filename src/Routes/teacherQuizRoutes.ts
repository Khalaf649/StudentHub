import { Router } from "express";
import {
  createQuiz,
  assignQuiz,
  getQuizzes,
} from "../Controllers/teacherQuizController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import quizValidator from "../Validation/quizValidator.js";
import studentQuizValidator from "../Validation/studentQuizValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", quizValidator, validationMiddleware, createQuiz);
router.post("/assign", studentQuizValidator, validationMiddleware, assignQuiz);
router.get("/", getQuizzes);

export default router;
