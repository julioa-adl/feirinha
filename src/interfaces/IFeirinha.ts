export type IlistCart = {
  productId: string,
  productName: string,
  quantity: number,
  price: number,
  buyed: boolean
}

export type Ifeirinha = {
  id?: string | undefined,
  _id?: string | undefined,
  userId: string | undefined,
  marketId: string | undefined,
  listCart?: IlistCart[] | undefined,
  date: string | undefined,
}
