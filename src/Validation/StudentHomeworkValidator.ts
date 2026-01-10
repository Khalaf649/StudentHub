import { body } from "express-validator";
import prisma from "../lib/prisma.js";

export default [
  body("student_id")
    .notEmpty()
    .withMessage("Student ID is required")
    .isInt({ gt: 0 })
    .withMessage("Student ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { id: Number(value) },
      });
      if (!student) {
        return Promise.reject("Student ID does not exist");
      }
    }),

  body("homework_id")
    .notEmpty()
    .withMessage("Homework ID is required")
    .isInt({ gt: 0 })
    .withMessage("Homework ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const homework = await prisma.homeworks.findUnique({
        where: { id: Number(value) },
      });
      if (!homework) {
        return Promise.reject("Homework ID does not exist");
      }
    }),

  body("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .isFloat({ min: 0 })
    .withMessage("Grade must be a non-negative number"),

  body("submission_date")
    .notEmpty()
    .withMessage("Submission date is required")
    .isISO8601()
    .withMessage("Submission date must be a valid ISO 8601 date"),
];
