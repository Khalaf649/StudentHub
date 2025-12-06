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
} from "../Controllers/studentController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import parentValidator from "../Validation/ParentValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";

const router = Router();

// Apply auth and role middleware to all routes below
router.use(authMiddleware, roleMiddleware("student"));

router.get("/sessions", getStudentSessions);
router.get("/homeworks", getStudentHomeworks);
router.post(
  "/parents",
  parentValidator,
  validationMiddleware,
  createStudentParent
);

router.get("/quizzes", getStudentQuizzes);
router.get("/parents", getStudentParents);
router.get("/info", getStudentInfo);

export default router;
