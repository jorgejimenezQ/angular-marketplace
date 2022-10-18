import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from 'src/app/user/user.service'
import { UserProductResponseData, ProductStorageService } from './product-storage.service'
import { ProductService } from './product.service'
/**
 * This resolver is used to fetch the products of the user that created the product. It uses the authenticated username.
 */
@Injectable({ providedIn: 'root' })
export class UserProductResolver implements Resolve<UserProductResponseData> {
  constructor(
    private productStorageService: ProductStorageService,
    private userService: UserService,
    private imageService: ImageService,
    private productService: ProductService
  ) {}

  /**
   * This method is called by the router to resolve the data
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProductResponseData> {
    const username = this.userService.getUser().username
    return this.productStorageService.fetchProductsByUser(username).pipe(
      tap((response) => {
        const products = response.products.map((product) => {
          return {
            ...product,
            images: [this.imageService.getProductImage()],
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
