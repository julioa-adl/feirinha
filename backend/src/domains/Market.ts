import IMarket from '../interfaces/IMarket';

export default class Market {
  protected id?: number | undefined;
  protected name: string;
  protected address: string;
  protected neighborhood: string;
  protected city: string;
  protected state: string;

  constructor(marketing: IMarket) {
    this.id = marketing.id;
    this.name = marketing.name;
    this.address = marketing.address;
    this.neighborhood = marketing.neighborhood;
    this.city = marketing.city;
    this.state = marketing.state;
  }
}
