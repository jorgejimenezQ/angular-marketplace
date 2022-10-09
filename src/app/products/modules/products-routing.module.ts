import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
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
    children: [
      { path: 'list', component: ProductListComponent },
      { path: 'sell', component: SellComponent },
      {
        path: 'details/:itemNumber',
        component: ProductDetailsComponent,
        resolve: [ProductDetailsResolver],
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
})
export class ProductsRoutingModule {}
