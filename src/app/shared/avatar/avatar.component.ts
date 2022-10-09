import { Component, Input, OnInit } from '@angular/core'
import { ImageService } from 'src/app/shared/helper/image.service'

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() username: string
  @Input() image: string

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.image = this.imageService.getProductOwnerImage(this.username)
  }
}
