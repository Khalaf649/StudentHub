import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import createCenterService from "../Services/TeacherService/createCenter";
import getCentersService from "../Services/TeacherService/getCentersService";
import createSessionService from "../Services/TeacherService/createSessionService";
import createHomeworkService from "../Services/TeacherService/createHomeworkService";
import assignHomeworkService from "../Services/TeacherService/assignHomeworkService";
import createQuizService from "../Services/TeacherService/createQuizService";
import assignQuizService from "../Services/TeacherService/assignQuizService";
import assignSessionService from "../Services/TeacherService/assignSessionService";

import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import {
  CreateCenterBody,
  CreateSessionBody,
  CreateHomeworkRequestBody,
  CreateParentRequestBody,
  CreateQuizRequestBody,
  CreateTrialRequestBody,
  StudentHomeworkRequestBody,
  StudentQuizRequestBody,
  StudentSessionRequestBody,
} from "../Interfaces/RequestBodies";

export const createCenter = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, location, phone }: CreateCenterBody = req.body;
  try {
    const center = await createCenterService(name, location, phone);

    res.status(201).json(center);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};
export const getCenters = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const centers = await getCentersService();
    res.status(200).json(centers);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};

export const createSession = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    description,
    centerId,
    section,
    sessionDatetime,
  }: CreateSessionBody = req.body;
  try {
    const session = await createSessionService(
      title,
      description,
      centerId,
      section,
      sessionDatetime
    );

    res.status(201).json(session);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

export const createHomework = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Create a homewor
  const {
    sessionId,
    title,
    startDate,
    description,
    dueDate,
    fullMark,
  }: CreateHomeworkRequestBody = req.body;
  const homework = await createHomeworkService(
    title,
    description,
    startDate,
    fullMark,
    sessionId,
    dueDate
  );
  try {
    res.status(201).json(homework);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};
export const StudentHomeworkController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    studentId,
    homeworkId,
    grade,
    submissionDate,
  }: StudentHomeworkRequestBody = req.body;
  try {
    const assignment = await assignHomeworkService(
      studentId,
      homeworkId,
      grade,
      submissionDate
    );
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};

export const createQuiz = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { session_id, full_mark, title, description }: CreateQuizRequestBody =
    req.body;
  try {
    const quiz = await createQuizService(
      session_id,
      full_mark,
      title,
      description
    );
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};
export const StudentQuizController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { studentId, quizId, grade }: StudentQuizRequestBody = req.body;
  try {
    const assignment = await assignQuizService(studentId, quizId, grade);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};
export const StudentSessionController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { studentId, sessionId, status }: StudentSessionRequestBody = req.body;
  console.log(req.body);
  try {
    const assignment = await assignSessionService(studentId, sessionId, status);
    res.status(201).json(assignment);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};
