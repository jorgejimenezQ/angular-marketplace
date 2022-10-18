import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { Product } from 'src/app/products/models/product.model'
import { ProductStorageService } from 'src/app/products/services/product-storage.service'
import { ProductService } from 'src/app/products/services/product.service'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from 'src/app/user/user.service'
import { Message } from '../model/message.model'
import { MessageStorageService } from '../services/message-storage.service'
import { MessageService } from '../services/message.service'

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit, OnDestroy {
  messages: Message[] = []
  subscription: Subscription
  otherUser: string
  messageGroupId: string
  product: Product
  PRODUCTS_INDEX = 0
  MESSAGES_INDEX = 1
  isNewConversation: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private msgStorageService: MessageStorageService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscription = this.messageService.messagesChanged.subscribe((messages) => {
      this.runInit(messages)
    })

    // Get the messages for the conversation
    this.runInit()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm) {
    // Get the message from the form
    const message = form.value.message

    console.log(message)

    // An observable that will be used to determine if the message was sent successfully
    let messageSentObservable: Observable<{
      convId: string
      message: Message
    }>

    // Call the service to send the message
    if (this.isNewConversation) {
      messageSentObservable = this.msgStorageService.postMessage(
        this.otherUser,
        message,
        this.product.itemNumber
      )
    } else {
      messageSentObservable = this.msgStorageService.postMessageWithMessageGroupId(
        this.messageGroupId,
        message
      )
    }

    messageSentObservable.subscribe({
      next: (response) => {
        const msg = response.message
        this.messageService.addMessage(msg)
      },
      error: (error) => {
        console.log(error)
      },
    })

    // Reset the form
    form.reset()
  }

  // Sets up the messaging component
  private runInit(messages: Message[] = null) {
    const msgGroup = this.messageService

    const isResponseFromCreate =
      this.route.snapshot.params['messageGroup'] === 'create' && messages !== null

    // console.log(this.route.snapshot.params['messageGroup'])
    // If this is a response from posting a new message, navigate to the new conversation
    if (isResponseFromCreate && !messages[0].messageGroup._id) {
      this.router.navigate(['/messages/', messages[0].messageGroup], {
        queryParams: { itemNumber: this.product.itemNumber },
      })
      return
    }

    // If the the message argument was not passed,
    // get the messages from the route data that was resolved
    this.messages = messages === null ? this.route.snapshot.data[this.MESSAGES_INDEX] : messages

    // Is this a new conversation?
    this.isNewConversation = this.route.snapshot.data[this.MESSAGES_INDEX].length === 0

    let otherUser: string
    console.log('what are we trying to access')
    if (this.isNewConversation) {
      console.log('For a new convo:')
      console.log(this.route.snapshot.data)
      this.route.snapshot.data[2].owner
    } else {
      console.log('When there are messages:', this.messages)
      otherUser = !this.messages[0].messageGroup.user1
        ? this.messages[0].messageGroup.user.username
        : 'noname'
    }
    // Get the other user's username either from the route data, if new conversation, or from
    // one of the messages
    this.otherUser = this.isNewConversation
      ? this.route.snapshot.data[2].owner
      : this.messages[0].messageGroup.user1.username

    // Get the other user from the message group object
    if (!this.isNewConversation && this.otherUser === this.userService.getUser().username)
      this.otherUser = this.messages[0].messageGroup.user2.username

    // Get the product
    if (!this.isNewConversation && this.messages.length > 0) {
      this.product = this.productService.getProduct(this.messages[0].product.itemNumber)
    } else {
      this.product = this.route.snapshot.data[2]
    }

    // Set the message group id
    this.messageGroupId = this.route.snapshot.params['messageGroup']
  }
}
