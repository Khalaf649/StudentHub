import AuthRequest from "../Interfaces/AuthRequest";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { CreateCenterBody,CreateSessionBody,CreateHomeworkRequestBody,CreateParentRequestBody,CreateQuizRequestBody,CreateTrialRequestBody } from "../Interfaces/RequestBodies";
const prisma = new PrismaClient();
export const createCenter=async(req:AuthRequest,res:Response,next:NextFunction)=>{
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
        res.status(500).json("Internal Server Error");
    }
}
export const getCenters=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const centers=await prisma.centers.findMany();
        res.status(200).json(centers);
    }catch(err){
        res.status(500).json("Internal Server Error");
    }
}

// export const createSession=async(req:AuthRequest,res:Response,next:NextFunction)=>{
//     // Create a session
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({errors:errors.array()});
//         return;
//     }
//     const body:CreateSessionBody=req.body;
//     try{
//         const session=await prisma.sessions.create({
//             data:{
//                 date:body.date,
//                 center_id:body.centerId,
//                 topic:body.topic,
//                 section:body.section,
//                 teacher_id:body.teacherId
//             }
//         });
//         res.status(201).json(session);
//     }catch(err){
//         next(err);
//     }
// }
// export const createHomework=async(req:AuthRequest,res:Response,next:NextFunction)=>{
//     // Create a homework
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({errors:errors.array()});
//        return
//     }
//     const body:CreateHomeworkRequestBody=req.body;
//     try{
//         const homework=await prisma.homeworks.create({
//             data:{
//                 session_id:body.sessionId,
//                 description:body.description,
//                 due_date:body.dueDate
//             }
//         });
//         res.status(201).json(homework);
//     }catch(err){
//         console.log(err);
//         res.status(500).json("Internal Server Error");
//     }
// }
// export const createQuiz=async(req:AuthRequest,res:Response,next:NextFunction)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({errors:errors.array()});
//         return;
//     }
//     const body:CreateQuizRequestBody=req.body;
//     try{
//         const quiz=await prisma.quizzes.create({
//             data:{
//                 session_id:body.sessionId,
//                 max_score:body.maxScore,
//                 date:body.date,
//                 description:body.desc
//             }
//         });
//         res.status(201).json(quiz);
//     }catch(err){
//         res.status(500).json("Internal Server Error");
//     }
//     // Create a quiz
// }
// export const createTrial=async(req:AuthRequest,res:Response,next:NextFunction)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({errors:errors.array()});
//         return;
//     }
//     const body:CreateTrialRequestBody=req.body;
//     try{
//         const trial=await prisma.trials.create({
//             data:{
//                 description:body.description,
//                 date:body.date,
//                 max_score:body.maxScore,
//                 section:body.section,
//                 teacher_id:body.teacherId,
//                 center_id:body.centerId
//             }
//         });
//         res.status(201).json(trial);
//     }catch(err){
//         res.status(500).json("Internal Server Error");
//     }
//     // Create a trial
// }
// export const createParent=async(req:AuthRequest,res:Response,next:NextFunction)=>{
//     // Create a parent
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({errors:errors.array()});
//         return;
//     }
//     const body:CreateParentRequestBody=req.body;
//     const hashedPassword=await bcrypt.hash(body.password,10);
//     try{
//         const parent=await prisma.parents.create({
//             data:{
//                 name:body.name,
//                 phone:body.phone,
//                 email:body.email,
//                 password:hashedPassword,
//             }
//         });

//         const parentRealtion=await prisma.student_parents.create({
//             data:{
//                 parent_id:parent.id,
//                 student_id:body.student_id,
//                 relationship:body.relationship
//             }
//         })
//         res.status(201).json({parent,parentRealtion});
//     }
//     catch(err){
//         res.status(500).json("Internal Server Error");
//     }
// }



