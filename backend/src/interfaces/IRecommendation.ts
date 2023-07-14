export interface IRecommendation {
    id?: string,
    userId: string,
    productId: string,
    rating: number,
    comment: string,
    date: Date,
}