import { Router } from "express";
import loginValidation from "../validation/loginValidator.ts";
import StudentValidator from "../validation/studentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import { login, registerStudent } from "../Controllers/authController.ts";

const router = Router();
// Middleware to authenticate and differentiate roles
router.post("/login", loginValidation, validationMiddleware, login);
router.post(
  "/register",
  StudentValidator,
  validationMiddleware,
  registerStudent
);

export default router;
