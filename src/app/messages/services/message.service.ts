import { Injectable } from '@angular/core'
import { Message } from '../model/message.model'

//TODO: write implementation
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: Message[] = []
}
