import { Router } from "express";
import {
  createCenter,
  getCenters,
} from "../Controllers/teacherCenterController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
import centerValidator from "../Validation/centerValidator.js";
import { validationMiddleware } from "../Middlewares/validationMiddleware.js";

const router = Router();
router.get("/", getCenters);
// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.post("/", centerValidator, validationMiddleware, createCenter);

export default router;
