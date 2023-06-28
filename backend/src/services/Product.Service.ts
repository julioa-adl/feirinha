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

  public async getAll() {
    const allProducts = await this.model.findAll();
    if (!allProducts) return { type: 404, payload: { token: null } };

    return { type: null, payload: allProducts };
  }

  public async create(product: IProduct) {
    const { name, subName, manufacturer, code, category, unitMeasure, size, image } = product;

    const existingProd = await this.model.findOne({code: code});
    if (existingProd) return { type: 409, message: 'Product alredy Register'};

    const newProduct = await this.model.create({
      name, subName, manufacturer, category, code, unitMeasure, size, image
    });
    return { type: null, message: 
      `Product ${newProduct.name}-${newProduct.subName}-${newProduct.size} successfuly registered`};
  }

  public async update(id: string, obj: object) {
    return await this.model.update(id, obj)
  }

  public async delete(id: string) {
    return await this.model.delete(id)
  }
}