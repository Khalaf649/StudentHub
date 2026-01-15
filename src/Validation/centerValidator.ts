import { body } from "express-validator";
export default [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("location")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),
  body("phone")
    .isString()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone must be 11 digits long"),
];
