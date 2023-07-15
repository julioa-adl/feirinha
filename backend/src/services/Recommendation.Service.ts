import Recommendation from "../domains/Recommendation";
import IRecommendation from "../interfaces/IRecommendation";
import RecommendationModel from "../models/Recommendation.Model";

export default class RecommendationService {
    public model = new RecommendationModel();
    public createRecommendationDomain(recommendation: IRecommendation | null): Recommendation | null {
        if (recommendation) {
          return new Recommendation(recommendation);
        }
        return null;
    }

    public async getAll() {
        const allRecommendations = await this.model.findAll();
        if (!allRecommendations) return { type: 404, payload: { token: null } };
    
        return { type: null, payload: allRecommendations };
    }

    public async create(recommendation: IRecommendation) {
        const { userId, productId, rating, comment, date } = recommendation;
    
        const newRecommendation = await this.model.create({
            userId, productId, rating, comment, date
        });
        return { type: null, message: 
          `Recommendation successfuly registered`};
      }
    
      public async delete(id: string) {
        return await this.model.delete(id)
      }
}
