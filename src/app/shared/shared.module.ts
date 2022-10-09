import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DropdownDirective } from './dropdown.directive'
import { MessageIconComponent } from './message-icon/message-icon.component'
import { ImageBubbleComponent } from './image-bubble/image-bubble.component'
import { AvatarComponent } from './avatar/avatar.component'

@NgModule({
  declarations: [DropdownDirective, MessageIconComponent, ImageBubbleComponent, AvatarComponent],
  imports: [RouterModule],
  exports: [DropdownDirective, MessageIconComponent, ImageBubbleComponent, AvatarComponent],
})
export class SharedModule {}
