import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwtFunctions';

const condition = (a: string, b: string, c: string, d: string) => a && b && c && d;

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const verify = await verifyToken(req.headers.authorization);
  if (!condition(verify._id, verify.name, verify.email, verify.role)) { 
    return res.status(401).json({ error: 'Invalid token!' }); 
  }
  next();
};

const validateUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role } = req.body;
  const verify = await verifyToken(req.headers.authorization);
  if (role === 'Super') {
    return res.status(400).json({ error: 'Não autorizado, Só pode haver 1 Super' }); 
  }
  if (role && verify.role !== 'Super') {
    return res.status(401).json({ error: 'Só o Super pode designar Roles' }); 
  }
  if (verify._id === id || verify.role === 'Admin' || verify.role === 'Super') { 
    return next();
  }
  return res.status(401).json({ error: 'Somente pessoal autorizado pode autializar' });
};

const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, birthday, role } = req.body;
  if (!name || !email || !password || !birthday) {
    return res.status(400).json({ error: 'Faltam informações' }); 
  }
  if (role !== 'User') {
    return res.status(401).json({ error: 'Você não tem permissão para cadastrar admins' }); 
  }
  next();
};

export default {
  validateToken,
  validateUserUpdate,
  validateRegister,
}
