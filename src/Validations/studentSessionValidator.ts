import { body } from "express-validator";
import prisma from "../lib/prisma.ts";
import { attendance_status } from "../generated/client/enums.ts";

export const studentSessionValidator = [
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

  body("session_id")
    .notEmpty()
    .withMessage("Session ID is required")
    .isInt({ gt: 0 })
    .withMessage("Session ID must be a positive integer")
    .bail()
    .custom(async (value) => {
      const session = await prisma.sessions.findUnique({
        where: { id: Number(value) },
      });
      if (!session) {
        return Promise.reject("Session ID does not exist");
      }
    }),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(attendance_status))
    .withMessage(
      `Status must be one of: ${Object.values(attendance_status).join(", ")}`,
    ),
];
