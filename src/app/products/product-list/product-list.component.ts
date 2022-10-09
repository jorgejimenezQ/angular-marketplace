import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from 'src/app/user/user.service'
import { Product } from '../models/product.model'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  productsSubscription: Subscription
  products: Product[]

  constructor(private productService: ProductService, private imageService: ImageService) {}

  ngOnInit(): void {
    console.log('Product List Component has been created')
    this.productsSubscription = this.productService.productChanged.subscribe(
      (products: Product[]) => {
        this.products = products
      }
    )
    this.products = this.productService.getAllProducts()
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
  }
  // Get the avatar image for the owner of the product
  getUserImage(username: string) {
    return this.imageService.getProductOwnerImage(username)
  }
}
