import { Router } from "express";
import {
  createHomework,
  assignHomework,
  getHomeworks,
} from "../Controllers/teacherHomeworkController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import homeworkValidator from "../Validation/HomeworkValidator";
import StudentHomeworkValidator from "../Validation/StudentHomeworkValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", homeworkValidator, validationMiddleware, createHomework);
router.post(
  "/assign",
  StudentHomeworkValidator,
  validationMiddleware,
  assignHomework
);
router.get("/", getHomeworks);

export default router;
