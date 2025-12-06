import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const validateStudentSession = [
  body("studentId").custom(async (value) => {
    if (!value) throw new Error("studentId is required");

    const student = await prisma.students.findUnique({
      where: { id: Number(value) },
    });
    if (!student) throw new Error("studentId does not exist");
  }),

  body("sessionId").custom(async (value) => {
    if (!value) throw new Error("sessionId is required");

    const session = await prisma.sessions.findUnique({
      where: { id: Number(value) },
    });
    if (!session) throw new Error("sessionId does not exist");
  }),

  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isIn(["attended", "absent"])
    .withMessage("status must be either 'attended' or 'absent'"),
];

export default validateStudentSession;
