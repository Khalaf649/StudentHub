import { Router } from "express";
import { loginValidator } from "../Validations/loginValidator.ts";
import { studentValidator } from "../Validations/studentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import {
  login,
  registerStudent,
  registerTeacher,
  registerAdmin,
  registerParent,
} from "../Controllers/authController.ts";

const router = Router();

// Login endpoint - supports all roles (student, teacher, admin, parent)
router.post("/login", loginValidator, validationMiddleware, login);

// Student registration
router.post(
  "/register/student",
  studentValidator,
  validationMiddleware,
  registerStudent,
);

// Teacher registration
router.post(
  "/register/teacher",
  studentValidator,
  validationMiddleware,
  registerTeacher,
);

// Admin registration
router.post(
  "/register/admin",
  studentValidator,
  validationMiddleware,
  registerAdmin,
);

// Parent registration
router.post(
  "/register/parent",
  studentValidator,
  validationMiddleware,
  registerParent,
);

export default router;
