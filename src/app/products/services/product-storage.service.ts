import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, tap } from 'rxjs'
import { Condition } from 'src/app/shared/condition.enum'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from 'src/app/user/user.service'
import { Product } from '../models/product.model'
import { ProductService } from './product.service'
import { environment } from 'src/environments/environment'

export interface UserProductResponseData {
  products: Product[]
}

@Injectable({ providedIn: 'root' })
export class ProductStorageService {
  private BASE_URL = environment.BASE_URL
  private LIMIT = '8'

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private imageService: ImageService,
    private userService: UserService
  ) {}

  /**
   * Calls the Marketplace API to update a user's product.
   *
   * @param itemNumber {string} The item number of the product.
   * @param product {name?: string, description?: string, price?: number} The product to update.
   *
   * @returns {Observable<Product>} An observable of the product.
   */
  editProduct(itemNumber: string, product: any): Observable<Product> {
    const url = this.BASE_URL + 'products/' + itemNumber
    const bearer = `Bearer ${this.userService.getUser().token}`

    if (!product.name && !product.description && !product.price) {
      console.log(Error('No product data to update'))
      return null
    }

    return this.http.patch<Product>(url, product, {
      headers: new HttpHeaders({ Authorization: bearer }),
    })
  }

  /**
   * Call the API to create a new product. The product is added to the user's products.
   *
   * @param name {string} The name of the product.
   * @param description {string} The description of the product.
   * @param price {number} The price of the product.
   * @param condition {Condition} The condition of the product.
   * @param category {string} The category of the product.
   * @returns {Observable<Product>} An observable of the product.
   */
  createProduct(
    description: string,
    name: string,
    condition: Condition,
    price: number,
    category: string
  ) {
    if (!this.userService.isUserAuthenticated()) {
      return null
    }

    const url = this.BASE_URL + 'products'

    const bearer = `Bearer ${this.userService.getUser().token}`
    const body = {
      name: name,
      description: description,
      price: price,
      condition: condition,
      category: category,
      imagePaths: [],
    }

    return this.http.post<Product>(url, body, {
      headers: new HttpHeaders({ Authorization: bearer }),
    })
  }
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
   * Calls the Marketplace API with a skip and limit to fetch the next page of products.
   */
  fetchNextPage(skip: number, limit: number) {
    const url = this.BASE_URL + 'products'

    return this.http
      .get<Product[]>(url, {
        params: new HttpParams().set('skip', skip.toString()).set('limit', limit.toString()),
      })
      .pipe(
        map((products) => {
          return products.map((product) => {
            product.images = [this.imageService.getProductImage()]
            product.owner = product.user.username
            return product
          })
        })
        // tap((products) => {
        //   this.productService.addProducts(products)
        // })
      )
  }

  /**
   * Fetches all the products from that belong to the user.
   * @param username {string} The username of the user.
   * @returns {Observable<Product[]>} An observable of the products.
   */
  fetchProductsByUser(username: string): Observable<UserProductResponseData> {
    if (!username) throw new Error('Username is required')

    let auth = this.userService.getUser()
    let authUser = auth ? auth.username : null

    const url = this.BASE_URL + 'users/' + username + '/products'
    return this.http.get<UserProductResponseData>(url).pipe(
      tap((response) => {
        if (authUser != null && username === authUser) {
          this.userService.updateUserProducts(response.products)
        }
      })
    )
  }

  /**
   * Fetches the product with the given item number.
   *
   * @param itemNumber {string} The item number of the product.
   * @returns {Observable<Product>} An observable of the product.
   */
  fetchProductByItemNumber(itemNumber: string): Observable<Product> {
    const url = this.BASE_URL + 'products/' + itemNumber

    return this.http.get<Product>(url).pipe(
      map((product) => {
        product.images = [this.imageService.getProductImage()]
        product.owner = product.user.username
        return product
      })
    )
  }
}
