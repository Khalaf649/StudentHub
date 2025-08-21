import { Response, NextFunction } from 'express';
import AuthRequest from '../Interfaces/AuthRequest';

export default function authorizeRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
}
