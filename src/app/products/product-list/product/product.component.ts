import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product
  @Input() userImage: string
  @Input() displayUserImage: boolean = true
  @Input() noImage: boolean = false
  @Input() routerPath: string[]
  @Input() showMessageCount: boolean = false
  @Input() messageCount: number | undefined = undefined

  ngOnInit(): void {}
}
