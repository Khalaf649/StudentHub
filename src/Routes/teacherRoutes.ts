import { Router } from "express";
import teacherCenterRoutes from "./teacherCenterRoutes.js";
import teacherHomeworkRoutes from "./teacherHomeworkRoutes.js";
import teacherQuizRoutes from "./teacherQuizRoutes.js";
import teacherSessionRoutes from "./teacherSessionRoutes.js";
import teacherStudentRoutes from "./teacherStudentRoutes.js";

const router = Router();

router.use("/center", teacherCenterRoutes);
router.use("/homework", teacherHomeworkRoutes);
router.use("/quiz", teacherQuizRoutes);
router.use("/session", teacherSessionRoutes);
router.use("/student", teacherStudentRoutes);

export default router;
