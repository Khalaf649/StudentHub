import { Router } from "express";
import { loginValidation } from "../Validation/LoginValidator";
import StudentValidator from "../Validation/StudentValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";
import { login, registerStudent } from "../Controllers/authController";

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
