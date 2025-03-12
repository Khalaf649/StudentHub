import { Router } from "express";
import { login } from "../Controllers/authController";
const router=Router();
const JWT_SECRET = process.env.JWT_SECRET as string;
// Middleware to authenticate and differentiate roles
router.post("/login",login);



export default router;