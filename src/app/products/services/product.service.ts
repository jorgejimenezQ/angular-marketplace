import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Condition } from '../../shared/condition.enum'
import { Product } from '../models/product.model'
import data from '../sample-data.json'

@Injectable({ providedIn: 'root' })
export class ProductService {
  public productChanged: Subject<Product[]> = new Subject<Product[]>()

  private products: Product[] = []

  constructor() {
    // let i = 0
    // for (let product of data) {
    //   const images: string[] = ['https://source.unsplash.com/random/200x200?sig=' + i]
    //   this.products.push(
    //     new Product(
    //       product.name,
    //       product.description,
    //       +product.price.substring(1),
    //       product.owner,
    //       product.itemNumber,
    //       images,
    //       product.isSold,
    //       Condition[product.condition.replace(/\s/g, '')],
    //       product.category
    //     )
    //   )
    //   i++
    // }
  }

  /**
   * Returns a copy of the current list of products
   * @returns {Product[]} - An array of products
   */
  public getAllProducts(): Product[] {
    return this.products.slice()
  }

  /**
   * Get a copy of the products up to a limit.
   * @param limit {number} - The last index (exclusive) in the array
   * @returns {Product[]} - An array of products
   */
  public getProductsLimit(limit: number): Product[] {
    if (limit >= this.products.length || !limit) return this.getAllProducts()
    return this.products.slice(undefined, limit)
  }

  /**
   * Updates the current list of products.
   *
   *  @param products {Product[]} - The array of products that will be the new products list
   */
  public updateAllProducts(products: Product[]) {
    this.products = products.slice()
    this.productChanged.next(this.getAllProducts())
  }

  /**
   * Get the product with the given item number.
   * @param itemNumber {string} - The item number of the product
   * @returns {Product} - The product with the given item number or null if not found
   */
  public getProduct(itemNumber: string): Product {
    const product = this.products.find((product) => product.itemNumber === itemNumber)
    if (!product) null
    return product
  }

  /**
   * Add a list of products to the current list of products.
   * @param products {Product[]} - The list of products to add
   */
  public addProducts(products: Product[]) {
    for (let product of products) {
      if (this.products.find((p) => p.itemNumber === product.itemNumber)) continue
      this.products.push(product)
    }
    this.productChanged.next(this.getAllProducts())
  }
}
