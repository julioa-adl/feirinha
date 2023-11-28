export type IlistCart = {
  id?: string | undefined,
  _id?: string | undefined,
  productId: string,
  productName: string,
  quantity: number  | string,
  price: number | string,
  buyed: boolean
}

export type Ifeirinha = {
  id?: string | undefined,
  _id?: string | undefined,
  title: string | undefined,
  userId: string | undefined,
  availableToSpend: number | string | undefined,
  marketId: string | undefined,
  listCart?: IlistCart[] | undefined,
  date: string | undefined,
}
