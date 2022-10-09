import { NgModule } from '@angular/core'
import { UserComponent } from '../user.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { UserRoutingModule } from './user-routing.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule, UserRoutingModule, FormsModule],
})
export class UserModule {
  constructor() {}
}
