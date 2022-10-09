import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ImageService } from 'src/app/shared/helper/image.service'
import { Product } from '../models/product.model'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product
  userProducts: Product[] = []
  isOwnedByUser: boolean = false

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.product = this.productService.getProduct(params['itemNumber'])
    })

    this.route.queryParamMap.subscribe((params) => {
      this.isOwnedByUser = this.route.snapshot.queryParams['isOwnedByUser'] !== undefined
      console.log(this.isOwnedByUser)
    })

    const returnedProducts = this.route.snapshot.data[0].products

    for (let p of returnedProducts) {
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
      this.userProducts.push(product)
    }
  }

  onMakeOffer() {}

  onSendMessage() {}

  // Get the avatar image for the owner of the product
  getUserImage(username: string) {
    return this.imageService.getProductOwnerImage(username)
  }
}
