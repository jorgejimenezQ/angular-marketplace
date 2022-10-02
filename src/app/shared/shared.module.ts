import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DropdownDirective } from './dropdown.directive'
import { MessageIconComponent } from './message-icon/message-icon.component'
import { ImageBubbleComponent } from './image-bubble/image-bubble.component'

@NgModule({
  declarations: [DropdownDirective, MessageIconComponent, ImageBubbleComponent],
  imports: [RouterModule],
  exports: [DropdownDirective, MessageIconComponent, ImageBubbleComponent],
})
export class SharedModule {}
