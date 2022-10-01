import { Injectable } from '@angular/core'
import { Condition } from '../shared/condition.enum'
import { Product } from './product.model'
import data from './sample-data.json'

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = []

  constructor() {
    for (let product of data) {
      const images: string[] = [...product.images]
      this.products.push(
        new Product(
          product.name,
          product.description,
          +product.price,
          product.owner,
          product.itemNumber,
          images,
          product.isSold,
          Condition[product.condition],
          product.category
        )
      )
    }
  }

  public getProducts() {
    return this.products.slice()
  }
}
