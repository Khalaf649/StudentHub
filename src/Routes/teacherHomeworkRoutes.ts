import { Router } from "express";
import {
  createHomework,
  assignHomework,
  getHomeworks,
} from "../Controllers/teacherHomeworkController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import homeworkValidator from "../Validation/homeworkValidator.js";
import studentHomeworkValidator from "../Validation/studentHomeworkValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", homeworkValidator, validationMiddleware, createHomework);
router.post(
  "/assign",
  studentHomeworkValidator,
  validationMiddleware,
  assignHomework
);
router.get("/", getHomeworks);

export default router;
