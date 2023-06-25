import IMarket from '../interfaces/IMarket';

export default class Market {
  protected id?: number | undefined;
  protected name: string;
  protected address: string;
  protected neighborhood: string;
  protected city: string;
  protected state: string;

  constructor(market: IMarket) {
    this.id = market.id;
    this.name = market.name;
    this.address = market.address;
    this.neighborhood = market.neighborhood;
    this.city = market.city;
    this.state = market.state;
  }
}
