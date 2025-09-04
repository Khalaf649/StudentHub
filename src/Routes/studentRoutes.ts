import { Router } from "express";
import { 
  getStudentSessions, 
  getStudentHomeworks, 
  //getStudentQuizzes, 
  //getStudentTrials, 
  //getStudentCenter,
  //getStudentParents,
 // getStudentInfo 
} from "../Controllers/studentController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";

const router = Router();

// Apply auth and role middleware to all routes below
router.use(authMiddleware, roleMiddleware("student"));

router.get("/sessions", getStudentSessions);
 router.get("/homeworks", getStudentHomeworks);
// router.get("/quizzes", getStudentQuizzes);
// router.get("/trials", getStudentTrials);
// router.get("/center", getStudentCenter);
// router.get("/parents", getStudentParents);
// router.get("/info", getStudentInfo);

export default router;