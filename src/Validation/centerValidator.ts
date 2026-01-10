import { body } from "express-validator";
import prisma from "../lib/prisma.js";

export default [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string")
    .isLength({ min: 3 })
    .withMessage("Location must be at least 3 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone must be 11 digits long"),
  body("phone").custom(async (value) => {
    const center = await prisma.centers.findUnique({
      where: { phone: value },
    });
    if (center) {
      return Promise.reject("Phone number is already registered");
    }
  }),
];
