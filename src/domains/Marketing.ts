import IMarket from '../interfaces/IMarket';

export default class Marketing {
  protected id?: string | undefined;
  protected name: string;

  constructor(marketing: IMarket) {
    this.id = marketing.id;
    this.name = marketing.name;
  }
}
