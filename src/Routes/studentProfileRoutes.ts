import { Router } from "express";
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
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply auth and role middleware to all routes below
router.use(authMiddleware, roleMiddleware("student"));

router.put("/profile", updateProfile);
router.post("/change-password", changePassword);
router.get("/grades", getGrades);
router.get("/attendance", getAttendance);
router.get("/homeworks/:id", getHomeworkDetail);
router.get("/quizzes/:id", getQuizDetail);
router.delete("/account", deleteAccount);

export default router;
