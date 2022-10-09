import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Product } from '../models/product.model'
import { ProductStorageService } from './product-storage.service'
import { ProductService } from './product.service'

/**
 * Will resolve the list of products before the product-list page is loaded
 */
@Injectable({ providedIn: 'root' })
export class ProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private productStorageService: ProductStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    // Get all products
    // TODO: Should we limit this one?; we should abstract the limit
    const products = this.productService.getProductsLimit(10)

    if (products.length == 0) return this.productStorageService.fetchAllProducts()
    return products
  }
}
