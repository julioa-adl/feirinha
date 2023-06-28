import { Request, Response } from 'express';
import IMarket from '../interfaces/IMarket';
import MarketService from '../services/Market.Service';

export default class MarketController {
  public service: MarketService;

  constructor() {
    this.service = new MarketService();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getAll(_req: Request, res: Response) {
    try {
      const { type, payload } = await this.service.getAll();
      if (type) {
        return res.status(404).json({ message: 'No Markets Returned' }); 
      } 
      return res.status(200).json(payload);
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao buscar mercados no banco', error: String(err),
      });
    }
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

  public async update(req: Request, res: Response) {
    try {
      const {id, ...obj} = req.body;
      const result = await this.service.update(id, obj);
      return res.status(200).json({ message: `Mercado ${result?.name} atualizado`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao atualizar mercado', error: String(err),
      })
    }
  }

}
