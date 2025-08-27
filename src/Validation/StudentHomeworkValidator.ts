import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default [
  body("studentId")
    .isInt({ gt: 0 }).withMessage("studentId must be a positive integer")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({ where: { id: value } });
      if (!student) {
        return Promise.reject("studentId does not exist");
      }
    }),

  body("homeworkId")
    .isInt({ gt: 0 }).withMessage("homeworkId must be a positive integer")
    .bail()
    .custom(async (value) => {
      const homework = await prisma.homeworks.findUnique({ where: { id: value } });
      if (!homework) {
        return Promise.reject("homeworkId does not exist");
      }
    }),

  body("grade")
    .optional()
    .isInt({ min: 0 }).withMessage("grade must be a non-negative integer"),

  body("submissionDate")
    .optional()
    .isISO8601().withMessage("submissionDate must be a valid ISO 8601 date"),
];
