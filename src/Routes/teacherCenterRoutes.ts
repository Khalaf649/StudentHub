import { Router } from "express";
import {
  createCenter,
  getCenters,
  getCentersNameOnly,
  updateCenter,
  deleteCenter,
} from "../Controllers/teacherCenterController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";
import { centerValidator } from "../Validations/centerValidator.ts";

import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

const router = Router();
// Apply authMiddleware and roleMiddleware("teacher") to all routes in this router
router.use(authMiddleware, roleMiddleware("teacher"));

router.get("/", getCenters);
router.get("/student-view", getCentersNameOnly);
router.post("/", centerValidator, validationMiddleware, createCenter);
router.put("/:id", updateCenter);
router.delete("/:id", deleteCenter);

export default router;
