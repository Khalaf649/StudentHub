import { Router } from "express";
import { createCenter } from "../Controllers/teacherController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import centerValidator from "../Validation/centerValidator";
import homeworkValidator from "../Validation/HomeworkValidator";
import SessionValidator from "../Validation/SessionValidator";
import QuizValidator from "../Validation/QuizValidator";
import TrialValidator from "../Validation/TrialValidator";
import StudentValidator from "../Validation/StudentValidator";
import ParentValidator from "../Validation/ParentValidator";
import { getCenters } from "../Controllers/teacherController";
import { validationMiddleware } from "../Middlewares/validationMiddleware";
const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/center", centerValidator, validationMiddleware, createCenter);
router.get('/center',getCenters)
// router.post("/session", SessionValidator, createSession);
// router.post("/homework", homeworkValidator, createHomework);
// router.post("/quiz", QuizValidator, createQuiz);
// router.post("/trial", TrialValidator, createTrial);
// router.post("/parent", ParentValidator, createParent);

export default router;
