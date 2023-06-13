import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwtFunctions';

const condition = (a: string, b: string, c: string, d: string) => a && b && c && d;

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const verify = await verifyToken(req.headers.authorization);
  if (!condition(verify.id, verify.name, verify.email, verify.role)) { 
    return res.status(401).json({ error: 'Invalid token!' }); 
  }
  next();
};

// const validateUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
//   const verify = await verifyToken(req.headers.authorization);
//   if (verify.) { 
//     return res.status(401).json({ error: 'Invalid token!' }); 
//   }
//   next();
// };

export default {
  validateToken,
}
