import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { AllMessagesComponent } from '../all-messages/all-messages.component'
import { CreateMessageComponent } from '../create-message/create-message.component'
import { MessageDetailsComponent } from '../message/message-details.component'
import { MessagesComponent } from '../messages.component'
import { MessageRoutingModule } from './message-routing.module'

@NgModule({
  declarations: [
    MessagesComponent,
    MessageDetailsComponent,
    AllMessagesComponent,
    CreateMessageComponent,
  ],
  imports: [RouterModule, CommonModule, SharedModule, MessageRoutingModule, FormsModule],
})
export class MessageModule {}
