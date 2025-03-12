import { Request, Response, NextFunction } from 'express';
import AuthRequest from '../Interfaces/AuthRequest';
export default function(req:AuthRequest,res:Response,next:NextFunction) {
    if( req.user?.role === 'student') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}