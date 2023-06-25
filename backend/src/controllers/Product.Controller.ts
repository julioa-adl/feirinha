import { Request, Response } from 'express';
import IProduct from '../interfaces/IProduct';
import ProductService from '../services/Product.Service';

export default class ProductController {
  public service: ProductService;

  constructor() {
    this.service = new ProductService();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getAll(_req: Request, res: Response) {
    try {
      const { type, payload } = await this.service.getAll();
      if (type) {
        return res.status(404).json({ message: 'No Products Returned' }); 
      } 
      return res.status(200).json(payload);
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao buscar produtos no banco', error: String(err),
      });
    }
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
        message: 'erro ao registrar novo produto', error: String(err),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id, ...obj } = req.body;
      const result = await this.service.update(id, obj);
      return res.status(200).json({ message: `${result?.name} atualizado`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao atualizar produto', error: String(err),
      })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await this.service.delete(id);
      if (result) return res.status(200).json({ 
        message: 
        `produto ${result.name}-${result.subName}-${result.size}${result.unitMeasure}
da ${result.manufacturer} excluido com sucesso`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao deletar produto', error: String(err),
      })
    }
  }
}