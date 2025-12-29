import { check } from "express-validator";
import prisma from "../prisma";
import Section from "../constants/section";

export default [
  check("name").isString().notEmpty().withMessage("Name is required"),

  check("phone")
    .isString()
    .notEmpty()
    .matches(/^\d{11}$/) // Enforces exactly 11 digits
    .withMessage("Phone must be exactly 11 digits")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { phone: value },
      });
      if (student) {
        return Promise.reject("Phone number is already registered");
      }
    }),

  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email must be a valid email address")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { email: value },
      });
      if (student) {
        return Promise.reject("Email is already registered");
      }
    }),

  check("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("section")
    .isIn(Object.values(Section))
    .withMessage(
      `Section must be one of: ${Object.values(Section).join(", ")}`
    ),

  check("center_id")
    .notEmpty()
    .withMessage("Center ID is required")
    .isInt()
    .withMessage("Center ID must be an integer")
    .bail()
    .custom(async (value) => {
      const center = await prisma.centers.findUnique({
        where: { id: Number(value) },
      });
      if (!center) {
        return Promise.reject("Center ID does not exist");
      }
    }),
];
