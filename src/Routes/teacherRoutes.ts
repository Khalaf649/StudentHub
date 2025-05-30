import { Router } from "express";
import { createCenter, createSession, createHomework, createQuiz, createTrial, createParent, createStudent } from "../Controllers/teacherController";
import authMiddleware from "../Middlewares/authMiddleware";
import teacherMiddleware from "../Middlewares/teacherMiddleware";
import centerValidator from "../Validation/centerValidator";
import homeworkValidator from "../Validation/HomeworkValidator";
import SessionValidator from "../Validation/SessionValidator";
import QuizValidator from "../Validation/QuizValidator";
import TrialValidator from "../Validation/TrialValidator";
import StudentValidator from "../Validation/StudentValidator";
import ParentValidator from "../Validation/ParentValidator";
const router = Router();
router.post("/center", authMiddleware, teacherMiddleware,centerValidator, createCenter);
router.post("/session", authMiddleware, teacherMiddleware,SessionValidator,createSession);
router.post("/homework", authMiddleware, teacherMiddleware, homeworkValidator,createHomework);
router.post("/quiz", authMiddleware, teacherMiddleware, QuizValidator,createQuiz);
router.post("/trial", authMiddleware, teacherMiddleware, TrialValidator,createTrial);
router.post("/parent", authMiddleware, teacherMiddleware, ParentValidator,createParent);
router.post("/student", authMiddleware, teacherMiddleware, StudentValidator,createStudent);

export default router;
