import { check } from "express-validator";

export default [
  check("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),

  check("date")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 string")
    .notEmpty()
    .withMessage("Date is required"),

  check("maxScore")
    .notEmpty()
    .withMessage("Max Score is required")
    .isInt({ min: 1 })
    .withMessage("Max Score must be a positive integer"),

  check("section")
    .isIn(["first_sec", "second_sec_scientific", "second_sec_literary", "third_sec"])
    .withMessage("Section must be one of: first_sec, second_sec_scientific, second_sec_literary, third_sec"),

  check("teacherId")
    .notEmpty().withMessage("Teacher ID is required")
    .isInt()
    .withMessage("Teacher ID must be an integer"),

  check("centerId")
     .notEmpty().withMessage("Center ID is required")
    .isInt()
    .withMessage("Center ID must be an integer"),
];
