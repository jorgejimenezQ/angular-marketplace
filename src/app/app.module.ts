import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { ProductsModule } from './products/modules/products.module'
import { SharedModule } from './shared/shared.module'
import { HeaderComponent } from './header/header.component'
import { HttpClientModule } from '@angular/common/http'
import { UserModule } from './user/modules/user.module'
import { MessageModule } from './messages/modules/messages.module'

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ProductsModule,
    SharedModule,
    UserModule,
    MessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
