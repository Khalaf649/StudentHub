import { Router } from "express";
import {
  createSession,
  assignSession,
  getSessions,
} from "../Controllers/teacherSessionController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import sessionValidator from "../Validation/sessionValidator.js";
import studentSessionValidator from "../Validation/studentSessionValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", sessionValidator, validationMiddleware, createSession);
router.post(
  "/assign",
  studentSessionValidator,
  validationMiddleware,
  assignSession
);
router.get("/", getSessions);

export default router;
