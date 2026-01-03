import { Router } from "express";
import teacherCenterRoutes from "./teacherCenterRoutes";
import teacherHomeworkRoutes from "./teacherHomeworkRoutes";
import teacherQuizRoutes from "./teacherQuizRoutes";
import teacherSessionRoutes from "./teacherSessionRoutes";
import teacherStudentRoutes from "./teacherStudentRoutes";

const router = Router();

router.use("/center", teacherCenterRoutes);
router.use("/homework", teacherHomeworkRoutes);
router.use("/quiz", teacherQuizRoutes);
router.use("/session", teacherSessionRoutes);
router.use("/student", teacherStudentRoutes);

export default router;
