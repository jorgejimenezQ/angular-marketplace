import { NgModule } from '@angular/core'
import { UserComponent } from '../user.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { UserRoutingModule } from './user-routing.module'
import { FormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module'
import { UserProductComponent } from '../user-product/user-product.component'
import { ProfileComponent } from '../profile/profile.component'

@NgModule({
  declarations: [UserComponent, UserProductComponent, ProfileComponent],
  imports: [CommonModule, RouterModule, UserRoutingModule, FormsModule, SharedModule],
})
export class UserModule {
  constructor() {}
}
