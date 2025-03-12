
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import  TokenPayload  from '../Interfaces/TokenPayload';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password,role } = req.body;
    if (!email || !password||!role) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }
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