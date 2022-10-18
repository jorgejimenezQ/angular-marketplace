import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService } from 'src/app/auth/auth-guard.service'
import { ConversationResolver } from 'src/app/messages/services/conversation-resolver.service'
import { ProductDetailsComponent } from '../product-details/product-details.component'
import { ProductDetailsResolver } from '../product-details/services/product-details.resolver'
import { ProductListComponent } from '../product-list/product-list.component'
import { ProductsComponent } from '../products.component'
import { SellComponent } from '../sell/sell.component'
import { ProductResolverService } from '../services/product-resolver.service'

const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: [ProductResolverService],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'sell', component: SellComponent, canActivate: [AuthGuardService] },
      {
        path: 'details/:itemNumber',
        component: ProductDetailsComponent,
        resolve: [ProductDetailsResolver, ConversationResolver],
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
})
export class ProductsRoutingModule {}
