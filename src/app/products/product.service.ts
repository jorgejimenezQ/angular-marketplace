import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Condition } from '../shared/condition.enum'
import { Product } from './models/product.model'
import data from './sample-data.json'

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productChanged: Subject<Product[]> = new Subject<Product[]>()

  private products: Product[] = []

  constructor() {
    let i = 0
    for (let product of data) {
      const images: string[] = ['https://source.unsplash.com/random/200x200?sig=' + i]
      this.products.push(
        new Product(
          product.name,
          product.description,
          +product.price.substring(1),
          product.owner,
          product.itemNumber,
          images,
          product.isSold,
          Condition[product.condition.replace(/\s/g, '')],
          product.category
        )
      )
      i++
    }
  }

  public getAllProducts() {
    return this.products.slice()
  }

  /**
   *
   */
  public getProductsLimit(limit: number) {
    if (limit >= this.products.length || !limit) return this.getAllProducts()
    return this.products.slice(undefined, limit)
  }
}
