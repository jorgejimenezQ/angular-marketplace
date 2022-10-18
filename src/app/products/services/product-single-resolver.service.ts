import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Product } from '../models/product.model'
import { ProductStorageService } from './product-storage.service'
import { ProductService } from './product.service'

/**
 * This resolver is used to fetch a specific product from the API using the item number in a query parameter.
 */
@Injectable({ providedIn: 'root' })
export class ProductSingleResolverService implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private productStorageService: ProductStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product | Observable<Product> | Promise<Product> {
    // Get the item number from the query parameter
    const itemNumber = route.queryParamMap.get('itemNumber')

    const product = this.productService.getProduct(itemNumber)

    if (product) {
      return product
    }

    // Call the API to get the product
    return this.productStorageService.fetchProductByItemNumber(itemNumber).pipe(
      tap((product) => {
        this.productService.addProducts([product])
      })
    )
  }
}
