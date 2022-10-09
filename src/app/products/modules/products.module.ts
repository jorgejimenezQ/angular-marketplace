import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { ProductDetailsComponent } from '../product-details/product-details.component'
import { ProductListComponent } from '../product-list/product-list.component'

import { ProductComponent } from '../product/product.component'
import { ProductsComponent } from '../products.component'
import { SellComponent } from '../sell/sell.component'
import { ProductsRoutingModule } from './products-routing.module'

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    SellComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule, RouterModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
