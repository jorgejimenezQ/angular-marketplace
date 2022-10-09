import { Component, OnInit } from '@angular/core'
import { Message } from './model/message.model'
import { MessageService } from './services/message.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  ngOnInit() {}
}
