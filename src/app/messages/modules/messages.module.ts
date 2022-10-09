import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { MessagesComponent } from '../messages.component'
import { MessageRoutingModule } from './message-routing.module'

@NgModule({
  declarations: [MessagesComponent],
  imports: [RouterModule, CommonModule, SharedModule, MessageRoutingModule],
})
export class MessageModule {}
