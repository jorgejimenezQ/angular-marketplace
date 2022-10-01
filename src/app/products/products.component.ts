import { Component } from '@angular/core'
import { ProductService } from './product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private productService: ProductService) {}
}
