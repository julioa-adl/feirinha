import { Request, Response } from 'express';
import IMarket from '../interfaces/IMarket';
import MarketService from '../services/Market.Service';

export default class MarketController {
  public service: MarketService;

  constructor() {
    this.service = new MarketService();
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    try {
      const marketInformation: IMarket = req.body;
      const { type, message } = await this.service.create(marketInformation);
      if (type) {
        return res.status(type).json({ message });
      }
      return res.status(201).json({ message });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao registrar mercado',
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
        message: 'erro ao deletar mercado',
        error: String(err),
      })
    }
  }
}
