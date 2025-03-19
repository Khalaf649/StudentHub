import { check } from "express-validator";

export default  [
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

  check("section")
    .isIn(["first_sec", "second_sec_scientific", "second_sec_literary", "third_sec"])
    .withMessage("Section must be one of: first_sec, second_sec_scientific, second_sec_literary, third_sec"),

  check("center_id")
    .notEmpty()
    .withMessage("Center ID is required")
    .isInt()
    .withMessage("Center ID must be an integer"),
];
