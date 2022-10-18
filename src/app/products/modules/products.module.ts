import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'
import { ProductDetailsComponent } from '../product-details/product-details.component'
import { ProductListComponent } from '../product-list/product-list.component'

import { ProductComponent } from '../product-list/product/product.component'
import { ProductsComponent } from '../products.component'
import { SellComponent } from '../sell/sell.component'
import { ProductsRoutingModule } from './products-routing.module'

@NgModule({
  declarations: [ProductsComponent, SellComponent, ProductListComponent, ProductDetailsComponent],
  imports: [CommonModule, RouterModule, ProductsRoutingModule, SharedModule, FormsModule],
})
export class ProductsModule {}
