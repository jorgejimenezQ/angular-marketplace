import { Component, OnInit } from '@angular/core'
import { Product } from '../models/product.model'
import { ProductService } from '../product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[]
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log(this.products)
    this.products = this.productService.getProductsLimit(10)
    console.log(this.products)
  }
}
