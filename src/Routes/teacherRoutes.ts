import { Router } from "express";
import { createCenter, createSession, createHomework, createQuiz, createTrial, createParent, createStudent } from "../Controllers/teacherController";
import authMiddleware from "../Middlewares/authMiddleware";
import teacherMiddleware from "../Middlewares/teacherMiddleware";
const router = Router();
router.post("/center", authMiddleware, teacherMiddleware, createCenter);
router.post("/session", authMiddleware, teacherMiddleware, createSession);
router.post("/homework", authMiddleware, teacherMiddleware, createHomework);
router.post("/quiz", authMiddleware, teacherMiddleware, createQuiz);
router.post("/trial", authMiddleware, teacherMiddleware, createTrial);
router.post("/parent", authMiddleware, teacherMiddleware, createParent);
router.post("/student", authMiddleware, teacherMiddleware, createStudent);

export default router;
