import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { ConversationResponse } from '../model/conversation-response.model'
import { Message } from '../model/message.model'

//TODO: write implementation
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = []
  messagesChanged = new Subject<Message[]>()
  conversations: ConversationResponse[] = []
  conversationChanged = new Subject<ConversationResponse[]>()

  constructor() {}

  /**
   * Returns the current list of messages.
   *
   * @returns {Message[]} The current list of messages.
   */
  getAllMessages() {
    return this.messages.slice()
  }

  /**
   * Adds a message to the current list of messages
   *
   * @param message {Message} The message to add.
   */
  addMessage(message: Message) {
    this.messages.push(message)
    this.messagesChanged.next(this.messages.slice())
  }

  /**
   * Updates the current list of messages and notifies all subscribers.
   *
   * @param messages The new list of messages.
   */
  updateMessages(messages: Message[]) {
    this.messages = messages.slice()
    this.messagesChanged.next(this.getAllMessages())
  }

  /**
   * Updates the current list of conversations and notifies all subscribers.
   *
   * @param conversations The new list of conversations.
   */
  updateConversations(conversations: ConversationResponse[]) {
    this.conversations = conversations.slice()
    this.conversationChanged.next(this.getAllConversations())
  }

  /**
   * Returns the current list of conversations.
   *
   * @returns {ConversationResponse[]} The current list of conversations.
   */
  getAllConversations() {
    return this.conversations.slice()
  }
}
