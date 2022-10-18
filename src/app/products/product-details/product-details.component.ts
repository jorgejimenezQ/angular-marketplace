import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from 'src/app/user/user.service'
import { Product } from '../models/product.model'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product
  userProducts: Product[] = []
  isOwnedByUser: boolean = false
  conversationExists: boolean = false
  messageGroup: string = null

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageService: ImageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Get the product from the route parameter
      this.product = this.productService.getProduct(params['itemNumber'])

      // Get the products of the owner of the product
      const returnedProducts = this.route.snapshot.data[0].products
      this.userProducts = this.adaptProduct(returnedProducts)
    })

    this.route.queryParamMap.subscribe((params) => {
      this.isOwnedByUser = this.route.snapshot.queryParams['isOwnedByUser'] !== undefined
    })

    const returnedProducts = this.route.snapshot.data[0].products
    this.userProducts = this.adaptProduct(returnedProducts)

    // Is there already a conversation between the user and the owner of the product?
    console.log(this.route.snapshot.data)
    if (this.userService.isUserAuthenticated() && this.route.snapshot.data[1].length > 0) {
      this.conversationExists = true
      this.messageGroup = this.route.snapshot.data[1][0].messageGroup
    }
  }

  onMakeOffer() {}

  onSendMessage() {
    let routePath: any[] = ['/messages', 'create']
    let queryParam = { itemNumber: this.product.itemNumber }

    if (this.conversationExists) {
      routePath = ['/messages', this.messageGroup]
    }

    this.router.navigate(routePath, {
      queryParams: queryParam,
    })
  }

  // Get the avatar image for the owner of the product
  getUserImage(username: string) {
    return this.imageService.getProductOwnerImage(username)
  }

  private adaptProduct(products: any) {
    const adaptedProducts: Product[] = []
    for (let p of products) {
      if (p.itemNumber === this.product.itemNumber) continue
      const product = new Product(
        p.name,
        p.description,
        p.price,
        this.product.owner,
        p.itemNumber,
        [this.imageService.getProductImage()],
        p.sold,
        p.condition,
        p.category
      )
      adaptedProducts.push(product)
    }
    return adaptedProducts
  }
}
