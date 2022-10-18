import { Product } from 'src/app/products/models/product.model'
import { Message } from './message.model'

export class ConversationResponse {
  messages: Message[]
  constructor(
    public user: { username: string; image?: string },
    public otherUser: { username: string; image?: string },
    public messageGroup: string,
    public conversationId: string,
    public product: Product
  ) {}
}
