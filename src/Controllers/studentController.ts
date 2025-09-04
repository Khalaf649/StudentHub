import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStudentSessions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const studentId = req.user?.id;

  try {
    const sessions = await prisma.student_sessions.findMany({
      where: { student_id: studentId },
      select: {
        id: true,          
        status: true,      

        sessions: {         
          select: {
            title: true,
            session_datetime: true,
            description: true,
            section: true,
          }
        }
      }
    });

    res.status(200).json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getStudentHomeworks = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const studentId = req.user?.id;

  try {
    const homeworks = await prisma.student_homework.findMany({
      where: { student_id: studentId },
      select: {
        id: true,
        grade:true,
        submission_date:true,
        homeworks: {
          select: {
            start_date: true,
            due_date: true,
            description: true,
            title:true,
            full_mark:true
          
          }
        }
      }
    });

    res.status(200).json(homeworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentInfo = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const studentId = req.user?.id;
  if (!studentId) {
    res.status(400).json({ message: "Student ID is required" });
    return;
  }

  try {
    const student = await prisma.students.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        section: true,
      },
    });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//   try {
//     const homeworks = await prisma.student_homeworks.findMany({
//       where: { student_id: studentId },
//       include: { homeworks: true },
//     });

//     res.status(200).json(homeworks);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getStudentQuizzes = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const studentId = req.user?.id;
//   if (!studentId) {
//     res.status(400).json({ message: "Student ID is required" });
//     return;
//   }

//   try {
//     const quizzes = await prisma.student_quizzes.findMany({
//       where: { student_id: studentId },
//       include: { quizzes: true },
//     });

//     res.status(200).json(quizzes);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getStudentTrials = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const studentId = req.user?.id;
//   if (!studentId) {
//     res.status(400).json({ message: "Student ID is required" });
//     return;
//   }

//   try {
//     const trials = await prisma.student_trials.findMany({
//       where: { student_id: studentId },
//       include: { trials: true },
//     });

//     res.status(200).json(trials);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getStudentCenter = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const studentId = req.user?.id;
//   if (!studentId) {
//     res.status(400).json({ message: "Student ID is required" });
//     return;
//   }

//   try {
//     const center = await prisma.students.findUnique({
//       where: { id: studentId },
//       include:{centers:true}
//     });
//     res.status(200).json(center);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getStudentParents = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const studentId = req.user?.id;
//   if (!studentId) {
//      res.status(400).json({ message: "Student ID is required" });
//     return;
//   }

//   try {
//     const parents = await prisma.student_parents.findMany({
//       where: { student_id: studentId },
//       include: { parents: true },
//     });

//     res.status(200).json(parents);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getStudentInfo = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const studentId = req.user?.id;
//   if (!studentId) {
//      res.status(400).json({ message: "Student ID is required" });
//     return;
//   }

//   try {
//     const student = await prisma.students.findUnique({
//       where: { id: studentId },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         section: true,
//         centers: {
//           select: {
//             name: true,
//             location: true,
//             phone: true,
//           },
//         },
//       },
//     });

//     if (!student) {
//        res.status(404).json({ message: "Student not found" });
//        return;
//     }

//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
