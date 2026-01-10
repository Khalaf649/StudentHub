import { body } from "express-validator";
import prisma from "../lib/prisma.js";
import { parent_role } from "../generated/client/enums.js";

export default [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .matches(/^\+?[0-9]{7,15}$/)
    .withMessage("Phone must be a valid number (7–15 digits, optional +)"),

  body("relationship")
    .notEmpty()
    .withMessage("Relationship is required")
    .isIn(Object.values(parent_role))
    .withMessage(
      `Relationship must be one of: ${Object.values(parent_role).join(", ")}`
    ),
];
