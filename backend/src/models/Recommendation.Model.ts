import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IRecommendation from '../interfaces/IRecommendation';

export default class RecommendationModel extends AbstractODM<IRecommendation> {
    constructor() {
        const schema = new Schema({
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            date: { type: Date, required: true },
        })
    super(schema, 'Recommendation')
  }
}