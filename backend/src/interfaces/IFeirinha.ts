export interface IList {
  productId: number,
  quantity: number,
  price: number,
}

export interface IFeirinha {
  id?: number,
  userId: number,
  marketId: number,
  listCart: IList[],
  date: Date,
}