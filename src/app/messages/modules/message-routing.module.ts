import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService } from 'src/app/auth/auth-guard.service'
import { ProductResolverService } from 'src/app/products/services/product-resolver.service'
import { ProductSingleResolverService } from 'src/app/products/services/product-single-resolver.service'
import { AllMessagesComponent } from '../all-messages/all-messages.component'
import { CreateMessageComponent } from '../create-message/create-message.component'
import { MessageDetailsComponent } from '../message/message-details.component'
import { MessagesComponent } from '../messages.component'
import { MessageDetailsResolver } from '../services/message-details-resolver.service'
import { UserMessagesResolverService } from '../services/user-messages-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'allMessages',
        component: AllMessagesComponent,
        resolve: [UserMessagesResolverService, ProductResolverService],
      },
      // {
      //   path: 'create',
      //   component: CreateMessageComponent,
      //   // resolve: [ProductResolverService, MessageDetailsResolver],
      // },
      {
        path: ':messageGroup',
        component: MessageDetailsComponent,
        resolve: [ProductResolverService, MessageDetailsResolver, ProductSingleResolverService],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MessageRoutingModule {}
