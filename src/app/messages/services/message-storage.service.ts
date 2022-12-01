import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { Product } from 'src/app/products/models/product.model'
import { UserService } from 'src/app/user/user.service'
import { ConversationResponse } from '../model/conversation-response.model'
import { Message } from '../model/message.model'
import { ItemMessagesResolver } from './item-messages-resolver.service'
import { MessageService } from './message.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class MessageStorageService {
  private BASE_URL = environment.BASE_URL

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  /**
   * Calls the API to ghe a list of messageGroups for the authenticated user.
   *
   * @returns {ConversationResponse[]} A list of conversations.
   */
  fetchAllUserConversations() {
    const url = `${this.BASE_URL}messages/conversations`

    // Get the user token
    const bearer = `Bearer ${this.userService.getUser().token}`

    // Call the API to get the message groups
    return this.http.get<ConversationResponse[]>(url, {
      headers: new HttpHeaders({ Authorization: bearer }),
    })
  }

  /**
   * Get all conversations for the given product.
   *
   * @param itemNumber The item number of the product.
   * @returns {Promise<ConversationResponse[]>} A promise with the conversations.
   */
  fetchAllProductConv(itemNumber: string) {
    const url = `${this.BASE_URL}messages/conversations/${itemNumber}`

    // console.log(url)
    const bearer = `Bearer ${this.userService.getUser().token}`
    return this.http.get<ConversationResponse[]>(url, {
      headers: new HttpHeaders({ Authorization: bearer }),
    })
  }

  /**
   * Fetch a product by its item number.
   * @param itemNumber The item number of the product.
   * @returns {Promise<Product>} A promise with the product.
   */
  fetchProductByItemNumber(itemNumber: string) {
    const url = `${this.BASE_URL}products/${itemNumber}`

    return this.http.get<Product>(url)
  }

  /**
   * Post a new message. This will create a new message group.
   *
   * @param messageBody The message body.
   * @param recipient The recipient of the message.
   * @param itemNumber The item number of the product.
   *
   * @returns {Promise<Message>} A promise with the message.
   */
  postMessage(recipient: string, messageBody: string, itemNumber: string) {
    const url = `${this.BASE_URL}messages`

    // Get the user token
    const bearer = `Bearer ${this.userService.getUser().token}`

    // Call the API to post a message
    return this.http.post<{ convId: string; message: Message }>(
      url,
      { recipient, messageBody, itemNumber },
      {
        headers: new HttpHeaders({ Authorization: bearer }),
      }
    )
  }

  /**
   * Posts a message with the message group id.
   */
  postMessageWithMessageGroupId(messageGroup: string, message: string) {
    const url = `${this.BASE_URL}messages/create/${messageGroup}`

    // Get the user token
    const bearer = `Bearer ${this.userService.getUser().token}`

    // Call the API to post a message with the message group id
    return this.http.post<{ convId: string; message: Message }>(
      url,
      { messageBody: message },
      {
        headers: new HttpHeaders({ Authorization: bearer }),
      }
    )
  }

  /**
   * Gets all the messages for the product passed in.
   *
   * @param itemNumber The item number of the product.
   * @returns {Promise<Message[]>} A promise with the messages.
   */
  fetchAllProductMessages(itemNumber: string) {
    const url = `${this.BASE_URL}messages/product/${itemNumber}`
    const bearer = `Bearer ${this.userService.getUser().token}`
    return this.http.get<Message[]>(url, {
      headers: new HttpHeaders({ Authorization: bearer }),
    })
  }

  /**
   * Gets all the messages with the message group id passed in.
   */
  fetchMessagesByMessageGroupId(messageGroupId: string) {
    const url = `${this.BASE_URL}messages/messageGroup/${messageGroupId}`

    // Get the user token
    const bearer = `Bearer ${this.userService.getUser().token}`

    // Call the API to get the messages
    return this.http.get<Message[]>(url, {
      headers: new HttpHeaders({ Authorization: bearer }),
    })
  }

  /**
   * Call the API to get the number of messages per product
   * for the authenticated user.
   *
   * @params {string[]} itemNumbers The item number of the product.
   *
   * @returns {Promise<{itemNumber: string, count: number}[]>} A promise with the number of messages per product.
   */
  getMessagesCount() {
    const url = `${this.BASE_URL}messages/count`

    // Get the user token
    const bearer = `Bearer ${this.userService.getUser().token}`

    return this.http.post<{ itemNumber: string; count: number }[]>(url, null, {
      headers: new HttpHeaders({ Authorization: bearer, 'Content-Type': 'application/json' }),
    })
  }
}
