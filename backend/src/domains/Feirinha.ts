import { IFeirinha, IList } from '../interfaces/IFeirinha';

export default class Feirinha {
  protected id?: string;
  protected userId: string;
  protected marketId: string;
  protected listCart: IList[];
  protected date: Date;

  constructor(feirinha: IFeirinha) {
    this.id = feirinha.id;
    this.userId = feirinha.userId;
    this.marketId = feirinha.marketId;
    this.listCart = feirinha.listCart;
    this.date = feirinha.date;
  }
}