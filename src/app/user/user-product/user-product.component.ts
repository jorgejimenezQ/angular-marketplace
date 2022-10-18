import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { ConversationResponse } from 'src/app/messages/model/conversation-response.model'
import { Message } from 'src/app/messages/model/message.model'
import { MessageService } from 'src/app/messages/services/message.service'
import { Product } from 'src/app/products/models/product.model'
import { ProductStorageService } from 'src/app/products/services/product-storage.service'
import { ProductService } from 'src/app/products/services/product.service'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
})
export class UserProductComponent implements OnInit, OnDestroy {
  product: Product
  subscription: Subscription
  messages: Message[]
  prodSubscriptions: Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productStorage: ProductStorageService,
    private msgService: MessageService,
    private imageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.product = params['itemNumber']
      this.product = this.productService.getProduct(params['itemNumber'])
    })

    this.subscription = this.msgService.messagesChanged.subscribe((messages) => {
      this.messages = this.groupMessages(messages)
    })

    this.messages = this.groupMessages(this.msgService.getAllMessages())
    const itemNumber = this.route.snapshot.params['itemNumber']
    this.product = this.productService.getProduct(itemNumber)
    console.log(this.product)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getUserImage() {
    return this.imageService.getUserAvatarImage(this.userService.getUser().username)
  }

  submit(form: NgForm) {
    console.log(form)
    if (form.pristine) {
      console.log(Error('No changes to submit'))
      return
    }

    const product = {}
    if (form.value.name) {
      product['name'] = form.value.name
    }
    if (form.value.description) {
      product['description'] = form.value.description
    }
    if (form.value.price) {
      product['price'] = form.value.price
    }

    console.log(product)

    this.productStorage.editProduct(this.product.itemNumber, product).subscribe((product) => {
      this.product = product
      this.productService.addProducts([product])
      form.reset()
    })
  }

  private groupMessages(messages: Message[]) {
    let currentMsgGroup = []
    const groupedMsgs: Message[] = []

    for (let msg of messages) {
      if (!currentMsgGroup.includes(msg.messageGroup)) {
        currentMsgGroup.push(msg.messageGroup)
        groupedMsgs.push(msg)
      }
    }
    return groupedMsgs
  }
}
