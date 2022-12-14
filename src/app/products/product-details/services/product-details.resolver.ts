import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { ImageService } from 'src/app/shared/helper/image.service'
import {
  ProductStorageService,
  UserProductResponseData,
} from '../../services/product-storage.service'
import { ProductService } from '../../services/product.service'

/**
 * Uses the item number parameter to resolve the users products.
 */
@Injectable({ providedIn: 'root' })
export class ProductDetailsResolver implements Resolve<UserProductResponseData> {
  constructor(
    private productStorageService: ProductStorageService,
    private productService: ProductService,
    private imageService: ImageService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProductResponseData> {
    // Get the username from the route params
    let currProduct = this.productService.getProduct(route.params['itemNumber'])

    const username = currProduct.owner
    // console.log(currProduct)

    // Get the products of the owner of the product
    return this.productStorageService.fetchProductsByUser(username).pipe(
      tap((response) => {
        const products = response.products.map((product) => {
          return {
            ...product,
            images: [this.imageService.getProductImage()],
            owner: username,
            user: {
              username: username,
              image: username,
            },
          }
        })
        this.productService.addProducts(products)
      })
    )
  }
}
