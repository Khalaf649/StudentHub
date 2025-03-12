import { Router } from "express";
import { getStudentSessions, getStudentHomeworks, getStudentQuizzes, getStudentTrials, getStudentCenter,getStudentParents } from "../Controllers/studentController";
import authMiddleware from "../Middlewares/authMiddleware";
import studentMiddleware from "../Middlewares/studentMiddleware";
const router = Router();

router.get("/sessions", authMiddleware,studentMiddleware, getStudentSessions);
router.get("/homeworks", authMiddleware,studentMiddleware, getStudentHomeworks);
router.get("/quizzes", authMiddleware, studentMiddleware,getStudentQuizzes);
router.get("/trials", authMiddleware, studentMiddleware,getStudentTrials);
router.get("/center", authMiddleware, studentMiddleware,getStudentCenter);
router.get("/parents", authMiddleware, studentMiddleware,getStudentParents);


export default router;
