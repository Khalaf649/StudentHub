import { Router } from "express";
import { loginValidation } from "../Validation/LoginValidator";
import StudentValidator from "../Validation/StudentValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";
import AuthService from "../Services/authService";
import AuthController from "../Controllers/authController";
const authService = new AuthService();
const authController = new AuthController(authService);

const router = Router();
// Middleware to authenticate and differentiate roles
router.post(
  "/login",
  loginValidation,
  validationMiddleware,
  authController.login.bind(authController)
);
router.post(
  "/register",
  StudentValidator,
  validationMiddleware,
  authController.registerStudent.bind(authController)
);

export default router;
