import { check } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default   [
    check("session_id")
      .custom(async (value, { req }) => {
        if (!value) {
            throw new Error("Session ID is required");
          }
         const session=await prisma.sessions.findUnique({
            where:{id:Number(value)}
         })
         if(!session){
            throw new Error("Session ID does not exist (Prisma)");
         }
          return true;
      }),

    check("title")
      .isString()
      .notEmpty()
      .withMessage("Title is required"),

    check("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required"),

    check("full_mark")
      .isInt({ min: 1 })
      .withMessage("Full mark must be a positive integer")
      .notEmpty()
      .withMessage("Full mark is required"),

];
