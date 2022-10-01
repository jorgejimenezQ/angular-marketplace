import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ProductModule } from './products/product.module'
import { ProductsComponent } from './products/products.component'

@NgModule({
  declarations: [AppComponent, ProductsComponent],
  imports: [BrowserModule, FormsModule, ProductModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
