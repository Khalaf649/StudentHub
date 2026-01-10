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
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import parentValidator from "../Validation/parentValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

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
