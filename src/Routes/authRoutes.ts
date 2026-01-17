import { Router } from "express";
// import loginValidation from "../validation/loginValidator.ts";
// import StudentValidator from "../validation/studentValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import { login, registerStudent } from "../Controllers/authController.ts";

const router = Router();
// Middleware to authenticate and differentiate roles
router.post("/login", validationMiddleware, login);
router.post("/register", validationMiddleware, registerStudent);

export default router;
