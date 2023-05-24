import { Request, Response, NextFunction } from 'express';

const validateUserBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) return res.status(400).json({ message: 'Body needs a name key' });
  if (!req.body.email) return res.status(400).json({ message: 'Body needs an email key' });
  if (!req.body.password) return res.status(400).json({ message: 'Body needs a password' });
  next();
};

export default validateUserBody;
