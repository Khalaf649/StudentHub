import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default [
  body("studentId")
    .isInt().withMessage("studentId must be an integer")
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { id: Number(value) },
      });
      if (!student) {
        return Promise.reject("student_id does not exist in the database");
      }
    }),

  body("quizId")
    .isInt().withMessage("quizId must be an integer")
    .custom(async (value) => {
      const quiz = await prisma.quizzes.findUnique({
        where: { quiz_id: Number(value) },
      });
      if (!quiz) {
        return Promise.reject("quiz_id does not exist in the database");
      }
    }),

  body("grade")
    .isFloat({ min: 0 }).withMessage("grade must be a number greater than or equal to 0"),
];


