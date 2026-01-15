import { Router } from "express";
import loginValidation from "../Validation/loginValidator.js";
import StudentValidator from "../Validation/studentValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";
import { login, registerStudent } from "../Controllers/authController.js";

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
