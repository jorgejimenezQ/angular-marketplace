import { Product } from '../products/models/product.model'

export class User {
  constructor(
    public username: string,
    public email: string,
    public image: string,
    public products: Product[],
    public _token: string
  ) {}

  get token() {
    return this._token
  }
}
