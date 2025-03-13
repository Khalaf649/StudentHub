import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getStudentSessions = async (req: AuthRequest, res: Response, next: NextFunction) => {
// Get all sessions of a student
}
export const getStudentHomeworks=async(req:AuthRequest,res:Response,next:NextFunction)=>{
// Get all homeworks of a student
}
export const getStudentQuizzes=async(req:AuthRequest,res:Response,next:NextFunction)=>{
// Get all quizzes of a student
}

export const getStudentTrials=async(req:AuthRequest,res:Response,next:NextFunction)=>{
// Get all trials of a student
}
export const getStudentCenter=async(req:AuthRequest,res:Response,next:NextFunction)=>{
// Get center of a student
}
export const getStudentParents=async(req:AuthRequest,res:Response,next:NextFunction)=>{
// Get parents of a student
}
export const getStudentInfo=async(req:AuthRequest,res:Response,next:NextFunction)=>{
// Get info of a student
}