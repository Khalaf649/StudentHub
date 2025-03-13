import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createCenter=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a center
}
export const createSession=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a session
}
export const createHomework=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a homework
}
export const createQuiz=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a quiz
}
export const createTrial=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a trial
}
export const createParent=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a parent
}
export const createStudent=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a student
}


