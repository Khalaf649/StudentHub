import { Router } from "express";
import {
  createCenter,
  getCenters,
} from "../Controllers/teacherCenterController";
import authMiddleware from "../Middlewares/authMiddleware";
import roleMiddleware from "../Middlewares/roleMiddleware";
import centerValidator from "../Validation/centerValidator";
import { validationMiddleware } from "../Middlewares/validationMiddleware";

const router = Router();

// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", centerValidator, validationMiddleware, createCenter);
router.get("/", getCenters);

export default router;
