import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { CreateCenterBody,CreateSessionBody,CreateHomeworkRequestBody,CreateParentRequestBody,CreateQuizRequestBody,CreateStudentRequestBody,CreateTrialRequestBody } from "../Interfaces/RequestBodies";
const prisma = new PrismaClient();
export const createCenter=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a center
    const body:CreateCenterBody=req.body;
    try{
        const center=await prisma.centers.create({
            data:{
                name:body.name,
                location:body.location,
                phone:body.phone
            }
        });
        res.status(201).json(center);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}
export const createSession=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a session
    const body:CreateSessionBody=req.body;
    try{
        const session=await prisma.sessions.create({
            data:{
                date:body.date,
                center_id:body.centerId,
                topic:body.topic,
                section:body.section,
                teacher_id:body.teacherId
            }
        });
        res.status(201).json(session);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}
export const createHomework=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a homework
    const body:CreateHomeworkRequestBody=req.body;
    try{
        const homework=await prisma.homeworks.create({
            data:{
                session_id:body.sessionId,
                description:body.description,
                due_date:body.dueDate
            }
        });
        res.status(201).json(homework);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}
export const createQuiz=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const body:CreateQuizRequestBody=req.body;
    try{
        const quiz=await prisma.quizzes.create({
            data:{
                session_id:body.sessionId,
                max_score:body.maxScore,
                date:body.date
            }
        });
        res.status(201).json(quiz);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
    // Create a quiz
}
export const createTrial=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const body:CreateTrialRequestBody=req.body;
    try{
        const trial=await prisma.trials.create({
            data:{
                description:body.description,
                date:body.date,
                max_score:body.maxScore,
                section:body.section,
                teacher_id:body.teacherId,
                center_id:body.centerId
            }
        });
        res.status(201).json(trial);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
    // Create a trial
}
export const createParent=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // Create a parent
    const body:CreateParentRequestBody=req.body;
    const hashedPassword=await bcrypt.hash(body.password,10);
    try{
        const parent=await prisma.parents.create({
            data:{
                name:body.name,
                phone:body.phone,
                email:body.email,
                password:hashedPassword,
            }
        });

        const parentRealtion=await prisma.student_parents.create({
            data:{
                parent_id:parent.id,
                student_id:body.student_id,
                relationship:body.relationship
            }
        })
        res.status(201).json([parent,parentRealtion]);
    }
    catch(err){
        res.status(500).json("Internal Server Error");
    }
}
export const createStudent=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const body:CreateStudentRequestBody=req.body;
    const hashedPassword=await bcrypt.hash(body.password,10);
    try{
        const student=await prisma.students.create({
            data:{
                name:body.name,
                phone:body.phone,
                email:body.email,
                password:hashedPassword,
                section:body.section,
                center_id:body.center_id
            }
        });
        res.status(201).json(student);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
}


