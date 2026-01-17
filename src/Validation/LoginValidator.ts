import { body } from "express-validator";
import { user_role } from "../generated/client/enums.ts";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .isIn(Object.values(user_role))
    .withMessage("Role must be one of: student, teacher"),
];
