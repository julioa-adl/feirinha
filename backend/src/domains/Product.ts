import IProduct from '../interfaces/IProduct';

export default class Product {
  protected id?: string;
  protected name: string;
  protected category: string;
  protected code: string;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.category = product.category;
    this.code = product.code;
  }
}