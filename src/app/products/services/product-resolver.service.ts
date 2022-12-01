import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Product } from '../models/product.model'
import { ProductStorageService } from './product-storage.service'
import { ProductService } from './product.service'
import { environment } from 'src/environments/environment'

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

    return this.productStorageService.fetchNextPage(0, environment.productsPerPage).pipe(
      tap((products) => {
        this.productService.addProducts(products)
      })
    )
  }
}
