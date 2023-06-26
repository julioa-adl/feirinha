import MarketModel from '../models/Market.Model';
import Market from '../domains/Market';
import IMarket from '../interfaces/IMarket';

export default class MarketService {
  public model = new MarketModel();
  public createMarketDomain(market: IMarket | null): Market | null {
    if (market) {
      return new Market(market);
    }
    return null;
  }

  public async getAll() {
    const allMarket = await this.model.findAll();
    if (!allMarket) return { type: 404, payload: { token: null } };

    return { type: null, payload: allMarket };
  }

  public async create(market: IMarket) {
    const { name, address, neighborhood, city, state } = market;

    const existingMarket = await this.model.findOne(
      {name: name, address: address, neighborhood: neighborhood});
    if (existingMarket) return { type: 409, message: 'Marketing alredy register'};

    const newMarket = await this.model.create({ name, address, neighborhood, city, state });
    return { type: null, message: `Marketing ${newMarket.name} successfully registered`};
  }

  public async update(id: string, obj: object) {
    return await this.model.update(id, obj)
  }

  public async delete(id: string) {
    return await this.model.delete(id)
  }
}