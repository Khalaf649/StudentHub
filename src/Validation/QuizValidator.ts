import { check } from "express-validator";

export default   [
  check("sessionId")
    .isInt()
    .withMessage("Session ID must be an integer")
    .notEmpty().withMessage("Session ID is required"),

  check("maxScore")
    .isInt({ min: 1 })
    .withMessage("Max Score must be a positive integer")
    .notEmpty().withMessage("Max Score is required"),

  check("date")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 string")
    .notEmpty().withMessage("Date is required"),

  check("desc")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
];
