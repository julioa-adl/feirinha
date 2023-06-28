import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwtFunctions';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id, role, name } = req.body;
  const verify = await verifyToken(req.headers.authorization);
  if (role === 'Super' || name === 'Super') {
    return res.status(400).json({ error: 'Só Existe Um Super, e Ele não compartilha O PODER' }); 
  }
  if (role && verify.role !== 'Super') {
    return res.status(401).json({ error: 'Apenas o Super pode alterar Role de usuários' }); 
  }
  if (verify._id === id || verify.role === 'Admin' || verify.role === 'Super') { 
    return next();
  }
  return res.status(401).json({ error: 'Permission Danied - No Changes' });
};

const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, birthday, role } = req.body;
  if (!name || !email || !password || !birthday || !role) {
    return res.status(400).json({ error: 'Faltam informações' }); 
  }
  if (role !== 'User') {
    return res.status(401).json({ error: 'Você não tem permissão para cadastrar admins' }); 
  }
  if (name === 'Super') {
    return res.status(401).json({ error: 'Só Existe Um Super, e Ele não compartilha O PODER' }); 
  }
  next();
};

const validSuper = async (req: Request, res: Response, next: NextFunction) => {
  const verify = await verifyToken(req.headers.authorization);
  if (verify.role === 'Super') {
    return next();
  }
  return res.status(401).json({ error: 'YOU HAVE NO POWER HERE' });
}

const validAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const verify = await verifyToken(req.headers.authorization);
  if (verify.role === 'Admin' || verify.role === 'Super') {
    return next();
  }
  return res.status(401).json({ error: 'YOU HAVE NO POWER HERE' });
}

export default {
  validateUser,
  validateRegister,
  validSuper,
  validAdmin,
}
