import { Router } from "express";
import {
  createCenter,
  getCenters,
} from "../Controllers/teacherCenterController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import centerValidator from "../Validation/centerValidator.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();
router.get("/", getCenters);
// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", centerValidator, validationMiddleware, createCenter);

export default router;
