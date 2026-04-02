import { Router } from "express";
import {
  getLinkedChildren,
  getChildHomeworks,
  getChildQuizzes,
  getChildAttendance,
  getChildGrades,
  unlinkChild,
} from "../Controllers/parentController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";

const router = Router();

// Apply auth middleware - IMPORTANT: parent role check needs to be added in auth.dto and login
// For now, we'll apply general auth
router.use(authMiddleware);

router.get("/children", getLinkedChildren);
router.get("/child/:childId/homeworks", getChildHomeworks);
router.get("/child/:childId/quizzes", getChildQuizzes);
router.get("/child/:childId/attendance", getChildAttendance);
router.get("/child/:childId/grades", getChildGrades);
router.delete("/child/:linkId/unlink", unlinkChild);

export default router;
