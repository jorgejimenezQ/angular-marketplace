import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DropdownDirective } from './dropdown.directive'
import { MessageIconComponent } from './message-icon/message-icon.component'
import { ImageBubbleComponent } from './image-bubble/image-bubble.component'
import { AvatarComponent } from './avatar/avatar.component'
import { ProductComponent } from '../products/product-list/product/product.component'
import { CommonModule } from '@angular/common'
import { SpinnerComponent } from './spinner/spinner.component'

@NgModule({
  declarations: [
    DropdownDirective,
    MessageIconComponent,
    ImageBubbleComponent,
    AvatarComponent,
    ProductComponent,
    SpinnerComponent,
  ],
  imports: [RouterModule, CommonModule],
  exports: [
    DropdownDirective,
    MessageIconComponent,
    ImageBubbleComponent,
    AvatarComponent,
    ProductComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
