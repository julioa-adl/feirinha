import { IFeirinha, IList } from '../interfaces/IFeirinha';

export default class Feirinha {
  protected id?: number;
  protected userId: number;
  protected marketId: number;
  protected listCart: IList[];
  protected date: Date;

  constructor(feirinha: IFeirinha) {
    this.id = feirinha.id;
    this.userId = feirinha.userId;
    this.marketId = feirinha.marketId;
    this.listCart = feirinha.listCart;
    this.date = feirinha.date;
  }

  public getId(): number | undefined {
    return this.id;
  }
}