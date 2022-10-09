import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/auth.service'
import { Product } from '../../models/product.model'
import {
  ProductStorageService,
  UserProductResponseData,
} from '../../services/product-storage.service'
import { ProductService } from '../../services/product.service'

@Injectable({ providedIn: 'root' })
export class ProductDetailsResolver implements Resolve<UserProductResponseData> {
  constructor(
    private productStorageService: ProductStorageService,
    private productService: ProductService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProductResponseData> {
    const username = this.productService.getProduct(route.params['itemNumber']).user.username
    return this.productStorageService.fetchProductsByUser(username)
  }
}
