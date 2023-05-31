import { Schema } from 'mongoose';
import IMarket from '../interfaces/IMarket';
import AbstractODM from './AbstractODM';

export default class MarketModel extends AbstractODM<IMarket> {
  constructor() {
    const schema = new Schema<IMarket>({
      name: { type: String, required: true },
      address: { type: String, required: true },
      neighborhood: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    })
    super(schema, 'Market')
  }
}
