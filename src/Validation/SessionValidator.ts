import { body } from "express-validator";
import prisma from "../lib/prisma.js";

export default [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 255 })
    .withMessage("Title must be less than 255 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("centerId")
    .notEmpty()
    .withMessage("Center ID is required")
    .isInt({ gt: 0 })
    .withMessage("Center ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const center = await prisma.centers.findUnique({
        where: { id: Number(value) },
      });
      if (!center) {
        throw new Error("Center does not exist");
      }
      return true;
    }),

  body("section")
    .notEmpty()
    .withMessage("Section is required")
    .isIn([
      "first_sec",
      "second_sec_scientific",
      "second_sec_literary",
      "third_sec",
    ])
    .withMessage("Invalid section"),

  body("sessionDatetime")
    .notEmpty()
    .withMessage("Session datetime is required")
    .isISO8601()
    .withMessage(
      "Invalid date format, must be ISO8601 (e.g. 2025-08-27T15:00:00Z)"
    ),
];
