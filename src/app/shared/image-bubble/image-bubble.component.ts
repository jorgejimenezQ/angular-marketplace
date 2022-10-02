import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-image-bubble',
  templateUrl: './image-bubble.component.html',
  styleUrls: ['./image-bubble.component.scss'],
})
export class ImageBubbleComponent implements OnInit {
  @Input() image: string

  constructor() {}

  ngOnInit(): void {}
}
