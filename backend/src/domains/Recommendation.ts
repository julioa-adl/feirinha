import IRecommendation from "../interfaces/IRecommendation";

export default class Recommendation {
    protected id?: string;
    protected userId: string;
    protected productId: string;
    protected rating: number;
    protected comment: string;
    protected date: Date;

    constructor(recommendation: IRecommendation) {
        this.id = recommendation.id;
        this.userId = recommendation.userId;
        this.productId = recommendation.productId;
        this.rating = recommendation.rating;
        this.comment = recommendation.comment;
        this.date = recommendation.date;
    }
}