import { Router } from "express";
import {
  getStudentPerformance,
  getAttendanceAnalytics,
} from "../Controllers/teacherExtendedController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.get("/student/:studentId/performance", getStudentPerformance);
router.get("/session/:sessionId/attendance", getAttendanceAnalytics);

export default router;
