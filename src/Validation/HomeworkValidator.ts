import { body } from "express-validator";

export default   [
  body("sessionId")
    .isInt()
    .withMessage("Session ID must be an integer")
    .notEmpty().withMessage("Session ID is required"),

  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),

  body("dueDate")
    .isISO8601()
    .withMessage("Due date must be a valid ISO 8601 date")
    .notEmpty().withMessage("Due date is required"),
];
