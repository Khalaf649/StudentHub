import { Router } from "express";
import {
  createSession,
  assignSession,
  getSessions,
} from "../Controllers/teacherSessionController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
// import SessionValidator from "../validation/sessionValidator.ts";
// import validateStudentSession from "../validation/studentSessionValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", validationMiddleware, createSession);
router.post("/assign", validationMiddleware, assignSession);
router.get("/", getSessions);

export default router;
