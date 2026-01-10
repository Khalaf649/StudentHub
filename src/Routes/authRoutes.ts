import { Router } from "express";
import loginValidator from "../Validation/loginValidator.js";
import studentValidator from "../Validation/studentValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";
import { login, registerStudent } from "../Controllers/authController.js";

const router = Router();
// Middleware to authenticate and differentiate roles
router.post("/login", loginValidator, validationMiddleware, login);
router.post(
  "/register",
  studentValidator,
  validationMiddleware,
  registerStudent
);

export default router;
