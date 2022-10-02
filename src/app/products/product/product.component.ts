import { Component, Input } from '@angular/core'
import { Product } from '../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product

  getUserImage() {
    const seed = this.product.name.split(' ')[0]
    let image = `https://avatars.dicebear.com/api/avataaars/${seed}.svg`
    return image
  }
}
