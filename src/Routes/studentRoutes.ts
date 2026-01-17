import { Router } from "express";
import {
  getStudentSessions,
  getStudentHomeworks,
  createStudentParent,
  getStudentQuizzes,
  //getStudentTrials,
  //getStudentCenter,
  getStudentParents,
  getStudentInfo,
} from "../Controllers/studentController.js";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
// import parentValidator from "../validation/parentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply auth and role middleware to all routes below
router.use(authMiddleware, roleMiddleware("student"));

router.get("/sessions", getStudentSessions);
router.get("/homeworks", getStudentHomeworks);
router.post("/parents", validationMiddleware, createStudentParent);

router.get("/quizzes", getStudentQuizzes);
router.get("/parents", getStudentParents);
router.get("/info", getStudentInfo);

export default router;
