import AuthRequest from '../Interfaces/AuthRequest';
import { Request, Response, NextFunction } from 'express';
export default   (req:AuthRequest, res:Response, next:NextFunction) => {
    if (req.user?.role === 'teacher') {
        next();
    }
    else {
        res.status(403).json({ message: 'Forbidden' });
    }
}