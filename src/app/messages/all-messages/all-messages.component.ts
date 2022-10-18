import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ProductStorageService } from 'src/app/products/services/product-storage.service'
import { ProductService } from 'src/app/products/services/product.service'
import { ImageService } from 'src/app/shared/helper/image.service'
import { ConversationResponse } from '../model/conversation-response.model'
import { MessageStorageService } from '../services/message-storage.service'
import { MessageService } from '../services/message.service'

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
})
export class AllMessagesComponent implements OnInit, OnDestroy {
  subscription: Subscription
  conversations: ConversationResponse[] = []

  constructor(
    private msgService: MessageService,
    private msgStorageService: MessageStorageService,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.msgService.conversationChanged.subscribe((conversations) => {
      this.beforeCreated(conversations)
    })
    this.beforeCreated(this.msgService.getAllConversations())
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  beforeCreated(conversations: ConversationResponse[]) {
    this.conversations = conversations
  }

  getProductImage(itemNumber: string) {
    const product = this.productService.getProduct(itemNumber)
    if (!product) {
      return this.imageService.getProductImageSeed('3')
    }
    return product.images[0]
  }
}
