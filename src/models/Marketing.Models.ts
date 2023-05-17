import { Schema } from 'mongoose';
import IMarket from '../interfaces/IMarket';
import AbstractODM from './AbstractODM';

export default class MarketingModel extends AbstractODM<IMarket> {
  constructor() {
    const schema = new Schema<IMarket>({
      name: { type: String, required: true },
    })
    super(schema, 'Marketing')
  }
}
