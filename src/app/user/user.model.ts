import { Product } from '../products/models/product.model'

export class User {
  constructor(
    private username: string,
    private email: string,
    private image: string,
    private products: Product[],
    private _token: string
  ) {}

  get token() {
    return this._token
  }
}
