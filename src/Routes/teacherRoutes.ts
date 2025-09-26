import { Router } from "express";
import { createCenter,createSession,createHomework,StudentHomeworkController,createQuiz,StudentQuizController } from "../Controllers/teacherController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import centerValidator from "../Validation/centerValidator";
import homeworkValidator from "../Validation/HomeworkValidator";
import SessionValidator from "../Validation/SessionValidator";
import QuizValidator from "../Validation/QuizValidator";
import TrialValidator from "../Validation/TrialValidator";
import StudentValidator from "../Validation/StudentValidator";
import ParentValidator from "../Validation/ParentValidator";
import StudentQuizValidator from "../Validation/StudentQuizValidator";
import StudentHomeworkValidator from "../Validation/StudentHomeworkValidator";
import { getCenters } from "../Controllers/teacherController";
import { validationMiddleware } from "../Middlewares/validationMiddleware";
const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.get('/center',getCenters)
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/center", centerValidator, validationMiddleware, createCenter);

 router.post("/session", SessionValidator, validationMiddleware, createSession);
 router.post("/homework", homeworkValidator, validationMiddleware, createHomework);
 router.post('/homework/assign', StudentHomeworkValidator, validationMiddleware, StudentHomeworkController);
 router.post("/quiz", QuizValidator, validationMiddleware, createQuiz);
 router.post("/quiz/assign", StudentQuizValidator, validationMiddleware, StudentQuizController);
// router.post("/trial", TrialValidator, createTrial);
// router.post("/parent", ParentValidator, createParent);

export default router;
