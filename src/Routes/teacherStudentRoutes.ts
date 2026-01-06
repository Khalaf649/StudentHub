import { Router } from "express";
import { getStudents } from "../Controllers/teacherStudentController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.get("/", getStudents);

export default router;
