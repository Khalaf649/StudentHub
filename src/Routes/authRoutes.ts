import { Router } from "express";
import { loginValidator } from "../Validations/loginValidator.ts";
import { studentValidator } from "../Validations/studentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import {
  login,
  registerStudent,
  registerTeacher,
} from "../Controllers/authController.ts";

const router = Router();
// Middleware to authenticate and differentiate roles
router.post("/login", loginValidator, validationMiddleware, login);
router.post(
  "/register/student",
  studentValidator,
  validationMiddleware,
  registerStudent,
);
router.post(
  "/register/teacher",
  studentValidator,
  validationMiddleware,
  registerTeacher,
);

export default router;
