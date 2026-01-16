import { Router } from "express";
import {
  createHomework,
  assignHomework,
  getHomeworks,
} from "../Controllers/teacherHomeworkController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import homeworkValidator from "../validation/homeworkValidator.ts";
import StudentHomeworkValidator from "../validation/studentHomeworkValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

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
