import { Schema } from 'mongoose';
import IProduct from '../interfaces/IProduct';
import AbstractODM from './AbstractODM';

export default class ProductModel extends AbstractODM<IProduct> {
  constructor() {
    const schema = new Schema<IProduct>({
      name: { type: String, required: true },
      category: { type: String, required: true },
      code: { type: String, required: true },
    })
    super(schema, 'Product')
  }
}