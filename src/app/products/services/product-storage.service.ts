import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, tap } from 'rxjs'
import { ImageService } from 'src/app/shared/helper/image.service'
import { Product } from '../models/product.model'
import { ProductService } from './product.service'

export interface UserProductResponseData {
  products: Product[]
}

@Injectable({ providedIn: 'root' })
export class ProductStorageService {
  private BASE_URL = 'https://jorge-marketplace-api.herokuapp.com/'
  private LIMIT = '12'

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private imageService: ImageService
  ) {}

  /**
   * Fetches all the products from the Marketplace API.
   *	214 × 136 px
   */
  fetchAllProducts() {
    const url = this.BASE_URL + 'products'

    return this.http
      .get<Product[]>(url, { params: new HttpParams().set('limit', this.LIMIT) })
      .pipe(
        map((products) => {
          //TODO: run this in the backend in the future
          return products.map((product) => {
            product.images = [this.imageService.getProductImage()]
            product.owner = product.user.username
            return product
          })
        }),
        tap((products) => {
          this.productService.updateAllProducts(products)
        })
      )
  }

  /**
   * Fetches all the products from that belong to the user.
   * @param username {string} The username of the user.
   * @returns {Observable<Product[]>} An observable of the products.
   */
  fetchProductsByUser(username: string): Observable<UserProductResponseData> {
    if (!username) throw new Error('Username is required')

    const url = this.BASE_URL + 'users/' + username + '/products'
    return this.http.get<UserProductResponseData>(url)
  }
}
