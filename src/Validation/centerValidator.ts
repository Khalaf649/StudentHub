import { body } from "express-validator";
export default [
    body("name").isString().isLength({ min: 3 }),
    body("location").isString().isLength({ min: 3 }),
    body("phone").isString().isLength({ min: 11, max: 11 }),
];