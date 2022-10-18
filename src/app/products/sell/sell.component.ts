import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { ProductStorageService } from '../services/product-storage.service'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  isLoading: boolean = false
  constructor(
    private productStorage: ProductStorageService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(form: NgForm) {
    const name = form.value.name
    const description = form.value.description
    const price = form.value.price
    const condition = form.value.condition
    const category = form.value.category
    this.productStorage.createProduct(description, name, condition, price, category).subscribe({
      next: (res) => {
        console.log(res)
        form.reset()
        this.router.navigate(['/profile'])
      },
      error: (e) => {
        console.log('there has been error f00: ', e)
      },
    })
  }
}
