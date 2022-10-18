import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Product } from 'src/app/products/models/product.model'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from '../user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  products: Product[]
  productSubscription: Subscription
  user: string
  messagesCount: { [key: string]: number } = {}

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productSubscription = this.userService.productsChanged.subscribe((products) => {
      this.products = products
      this.getCounts()
    })

    console.log(this.route.snapshot.data)

    this.getCounts()
    this.products = this.userService.getUserProducts()
    this.user = this.userService.getUser().username
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe()
  }

  // Get the avatar image for the owner of the product
  getUserImage(username: string) {
    return this.imageService.getProductOwnerImage(username)
  }

  getCounts() {
    for (let item of this.route.snapshot.data[0]) {
      this.messagesCount[item.itemNumber] = item.count
    }

    console.log(this.messagesCount['SWe3b4f494'])
    console.log(this.messagesCount)
  }
}
