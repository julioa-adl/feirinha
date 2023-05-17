import { Request, Response } from 'express';
import IProduct from '../interfaces/IProduct';
import ProductService from '../services/Product.Service';

export default class ProductController {
  public service: ProductService;

  constructor() {
    this.service = new ProductService();
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    try {
      const product: IProduct = req.body;
      const { type, message } = await this.service.create(product);
      if (type) {
        return res.status(type).json({ message });
      }
      return res.status(201).json({ message });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao registrar novo produto',
        error: String(err),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await this.service.delete(id);
      return res.status(200).json({ message: `${result} excluido com sucesso`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao deletar produto',
        error: String(err),
      })
    }
  }
}