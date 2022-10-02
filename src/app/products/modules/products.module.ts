import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module'

import { ProductComponent } from '../product/product.component'
import { ProductsComponent } from '../products.component'
import { ProductsRoutingModule } from './products-routing.module'

@NgModule({
  declarations: [ProductComponent, ProductsComponent],
  imports: [CommonModule, RouterModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
