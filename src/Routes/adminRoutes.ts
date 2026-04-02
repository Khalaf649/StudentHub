import { Router } from "express";
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  getStatistics,
  generateReport,
  getUserById,
} from "../Controllers/adminController.ts";
import authMiddleware from "../Middlewares/authMiddleware.ts";
import roleMiddleware from "../Middlewares/roleMiddleware.ts";

const router = Router();

// Apply auth and role middleware to all routes below
router.use(authMiddleware, roleMiddleware("admin"));

router.post("/users/register", registerUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/statistics", getStatistics);
router.get("/reports", generateReport);

export default router;
