import { Router } from "express";
import { getStudents } from "../Controllers/teacherStudentController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.get("/", getStudents);

export default router;
