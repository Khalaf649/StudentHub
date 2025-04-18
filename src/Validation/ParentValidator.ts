import { check } from "express-validator";

export default   [
  check("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required"),

  check("phone")
    .isString()
    .matches(/^\d{11}$/) // Enforces exactly 11 digits
    .withMessage("Phone must be exactly 11 digits"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  check("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("student_id")
    .notEmpty()
    .withMessage("Student ID is required")
    .isInt()
    .withMessage("Student ID must be an integer"),

  check("relationship")
    .isIn(["father", "mother", "guardian"])
    .withMessage("Relationship must be one of: father, mother, guardian"),
];
