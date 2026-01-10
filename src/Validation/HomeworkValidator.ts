import { body } from "express-validator";
import prisma from "../lib/prisma.js";

export default [
  body("session_id")
    .notEmpty()
    .withMessage("Session ID is required")
    .isInt({ gt: 0 })
    .withMessage("Session ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const session = await prisma.sessions.findUnique({
        where: { id: Number(value) },
      });
      if (!session) {
        throw new Error("Session does not exist");
      }
      return true;
    }),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters"),

  body("start_date")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Invalid start date format (must be ISO8601)"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("due_date")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Invalid due date format (must be ISO8601)")
    .custom((value, { req }) => {
      const start = new Date(req.body.start_date);
      const due = new Date(value);
      if (due <= start) {
        throw new Error("Due date must be after start date");
      }
      return true;
    }),

  body("full_mark")
    .notEmpty()
    .withMessage("Full mark is required")
    .isInt({ gt: 0 })
    .withMessage("Full mark must be a positive integer"),
];
