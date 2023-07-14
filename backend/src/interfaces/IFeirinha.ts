export interface IList {
  productId: string,
  quantity: number,
  price: number,
}

export interface IFeirinha {
  id?: string,
  userId: string,
  marketId: string,
  listCart: IList[],
  date: Date,
}