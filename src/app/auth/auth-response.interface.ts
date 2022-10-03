import { Product } from '../products/models/product.model'

export interface IAuthResponse {
  username: string
  email: string
  image: string
  products: Product[]
  token: string
}
