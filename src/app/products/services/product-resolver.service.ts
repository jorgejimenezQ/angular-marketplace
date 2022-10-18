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

    return this.productStorageService.fetchAllProducts()
  }
}
