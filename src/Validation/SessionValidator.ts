import { check } from "express-validator";

export default   [
  check("teacherId")
    .isInt()
    .withMessage("Teacher ID must be an integer").notEmpty().withMessage("Teacher ID is required"),

  check("date")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 string").notEmpty().withMessage("Date is required"),

  check("centerId")
    .isInt()
    .withMessage("Center ID must be an integer").notEmpty().withMessage("Center ID is required"),

  check("topic")
    .isString()
    .notEmpty()
    .withMessage("Topic is required"),

  check("section")
    .isIn(["first_sec", "second_sec_scientific", "second_sec_literary", "third_sec"])
    .withMessage("Invalid section. Allowed values: first_sec, second_sec_scientific, second_sec_literary, third_sec"),
];
