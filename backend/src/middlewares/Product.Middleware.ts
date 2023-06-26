import { Request, Response, NextFunction } from 'express';

const condition = (
  a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string
  ) => a && b && c && d && e && f && g && h;

const validCreateProd = async (req: Request, res: Response, next: NextFunction) => {
  const { name, subName, manufacturer, category, code, unitMeasure, size, image } = req.body;
  if (!condition(name, subName, manufacturer, category, code, unitMeasure, size, image)) {
    return res.status(400).json({ error: 'Faltam informações' }); 
  }
  next();
};

export default {
  validCreateProd,
}
