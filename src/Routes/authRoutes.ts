import { Router } from "express";
import { loginValidator } from "../Validations/loginValidator.ts";
import { studentValidator } from "../Validations/studentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import { login, registerStudent } from "../Controllers/authController.ts";

const router = Router();
// Middleware to authenticate and differentiate roles
router.post("/login", loginValidator, validationMiddleware, login);
router.post(
  "/register",
  studentValidator,
  validationMiddleware,
  registerStudent,
);

export default router;
