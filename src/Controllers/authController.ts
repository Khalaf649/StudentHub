
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import  TokenPayload  from '../Interfaces/TokenPayload';
import { LoginRequestBody,RegisterStudentRequestBody } from '../Interfaces/RequestBodies';

import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body as LoginRequestBody;
    let user;
    if(role==="student"){
        user = await prisma.students.findUnique({
            where: { email },
        });
    }
    else if(role==="teacher"){
        user = await prisma.teachers.findUnique({
            where: { email },
        });
        
    }
    else{
        res.status(400).json({ message: 'Invalid Credintials' });
        return;
    }

    if (!user) {
        res.status(400).json({ message: 'Invalid Credintials' });
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid Credintials' });
        return;
    }
    const tokenPayload: TokenPayload = { id: user.id, role: role };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token,role });

 
}
export const register=async (req: Request, res: Response, next: NextFunction) => {
  
    const body:RegisterStudentRequestBody=req.body;
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
        res.status(500).json("Internal Server Error");
    }
}