import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { Config } from '../utils/config';

interface CustomRequest extends Request {
  userId?: string;
}

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    logger.warn('Access denied: No token provided');
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, Config.jwt_secret as string) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    logger.warn(`Invalid token: ${err}`);
    res.status(401).json({ message: 'Invalid token' });
  }
};
