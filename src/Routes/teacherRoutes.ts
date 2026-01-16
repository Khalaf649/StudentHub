import { Router } from "express";
import teacherCenterRoutes from "./teacherCenterRoutes.ts";
import teacherHomeworkRoutes from "./teacherHomeworkRoutes.ts";
import teacherQuizRoutes from "./teacherQuizRoutes.ts";
import teacherSessionRoutes from "./teacherSessionRoutes.ts";
import teacherStudentRoutes from "./teacherStudentRoutes.ts";

const router = Router();

router.use("/center", teacherCenterRoutes);
router.use("/homework", teacherHomeworkRoutes);
router.use("/quiz", teacherQuizRoutes);
router.use("/session", teacherSessionRoutes);
router.use("/student", teacherStudentRoutes);

export default router;
