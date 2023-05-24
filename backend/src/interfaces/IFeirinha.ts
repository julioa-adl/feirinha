export interface IList {
  productId: string,
  quantity: string,
  price: string,
}

export interface IFeirinha {
  id?: string,
  userId: string,
  marketId: string,
  listCart: IList[],
  date: Date,
}