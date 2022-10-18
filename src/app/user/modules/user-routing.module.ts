import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService } from 'src/app/auth/auth-guard.service'
import { ConversationResolver } from 'src/app/messages/services/conversation-resolver.service'
import { ItemMessagesResolver } from 'src/app/messages/services/item-messages-resolver.service'
import { MessagesCountResolver } from 'src/app/messages/services/messages-count-resolver.service'
import { UserProductResolver } from 'src/app/products/services/user-product-resolver.service'
import { ProfileComponent } from '../profile/profile.component'
import { UserProductComponent } from '../user-product/user-product.component'
import { UserComponent } from '../user.component'

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    resolve: [UserProductResolver],
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'product/:itemNumber',
        component: UserProductComponent,
        resolve: [ItemMessagesResolver],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: [MessagesCountResolver],
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
