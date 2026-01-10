import { check } from "express-validator";
import prisma from "../lib/prisma.js";

export default [
  check("session_id")
    .notEmpty()
    .withMessage("Session ID is required")
    .isInt({ gt: 0 })
    .withMessage("Session ID must be a positive integer")
    .bail()
    .custom(async (value, { req }) => {
      const session = await prisma.sessions.findUnique({
        where: { id: Number(value) },
      });
      if (!session) {
        throw new Error("Session ID does not exist");
      }
      return true;
    }),

  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  check("full_mark")
    .notEmpty()
    .withMessage("Full mark is required")
    .isInt({ min: 1 })
    .withMessage("Full mark must be a positive integer"),
];
