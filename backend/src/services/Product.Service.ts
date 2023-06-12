import Product from '../domains/Product';
import IProduct from '../interfaces/IProduct';
import ProductModel from '../models/Product.Model';

export default class ProductService {
  public model = new ProductModel();
  public createProductDomain(product: IProduct | null): Product | null {
    if (product) {
      return new Product(product);
    }
    return null;
  }

  public async create(product: IProduct) {
    const { name, code, category, unitMeasure, size } = product;

    const existingProd = await this.model.findOne({code: code});
    if (existingProd) return { type: 409, message: 'Product alredy Register'};

    const newProduct = await this.model.create({name, category, code, unitMeasure, size});
    return { type: null, message: `Product ${newProduct.name} successfuly registered`};
  }

  public async update(id: string, obj: object) {
    return await this.model.update(id, obj)
  }
}