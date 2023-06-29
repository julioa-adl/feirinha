import { Request, Response, NextFunction } from 'express';

const condition = (
  a: string, b: string, c: string, d: string, e: string
  ) => a && b && c && d && e;

const validCreateMarket = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, neighborhood, city, state } = req.body;
  if (!condition(name, address, neighborhood, city, state)) {
    return res.status(400).json({ error: 'Faltam informações' }); 
  }
  next();
};

export default {
  validCreateMarket,
}
