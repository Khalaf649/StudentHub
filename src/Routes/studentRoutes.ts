import { Router } from "express";
import {
  getStudentSessions,
  getStudentHomeworks,
  createStudentParent,
  getStudentQuizzes,
  getStudentParents,
  getStudentInfo,
} from "../Controllers/studentController.ts";
import {
  updateProfile,
  changePassword,
  getGrades,
  getAttendance,
  getHomeworkDetail,
  getQuizDetail,
  deleteAccount,
} from "../Controllers/studentProfileController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import { parentValidator } from "../Validations/parentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply auth and role middleware to all routes below
router.use(authMiddleware, roleMiddleware("student"));

// Basic student info routes
router.get("/info", getStudentInfo);
router.put("/profile", updateProfile);
router.post("/change-password", changePassword);
router.delete("/account", deleteAccount);

// Academic routes
router.get("/sessions", getStudentSessions);
router.get("/homeworks", getStudentHomeworks);
router.get("/homeworks/:id", getHomeworkDetail);
router.get("/quizzes", getStudentQuizzes);
router.get("/quizzes/:id", getQuizDetail);

// Parent linkage routes
router.post(
  "/parents",
  parentValidator,
  validationMiddleware,
  createStudentParent,
);
router.get("/parents", getStudentParents);

// Grades and attendance
router.get("/grades", getGrades);
router.get("/attendance", getAttendance);

export default router;
