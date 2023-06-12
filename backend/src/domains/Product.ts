import IProduct from '../interfaces/IProduct';

export default class Product {
  protected id?: number;
  protected name: string;
  protected category: string;
  protected code: string;
  protected unitMeasure: string;
  protected size: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.category = product.category;
    this.code = product.code;
    this.unitMeasure = product.unitMeasure;
    this.size = product.size;
  }
}