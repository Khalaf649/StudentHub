import { Router } from "express";
import { login, register } from "../Controllers/authController";
import { loginValidation } from "../Validation/LoginValidator";
import StudentValidator from "../Validation/StudentValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";
const router=Router();
const JWT_SECRET = process.env.JWT_SECRET as string;
// Middleware to authenticate and differentiate roles
router.post("/login",loginValidation,validationMiddleware,login);
router.post("/register",StudentValidator,validationMiddleware,register);



export default router;