import { body } from "express-validator";
import prisma from "../lib/prisma.ts";

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

  body("quiz_id")
    .notEmpty()
    .withMessage("Quiz ID is required")
    .isInt({ gt: 0 })
    .withMessage("Quiz ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const quiz = await prisma.quizzes.findUnique({
        where: { id: Number(value) },
      });
      if (!quiz) {
        return Promise.reject("Quiz ID does not exist");
      }
    }),

  body("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .isFloat({ min: 0 })
    .withMessage("Grade must be a number greater than or equal to 0"),
];
