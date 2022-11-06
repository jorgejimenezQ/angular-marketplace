import { Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ImageService } from 'src/app/shared/helper/image.service'
import { UserService } from 'src/app/user/user.service'
import { Product } from '../models/product.model'
import { ProductStorageService } from '../services/product-storage.service'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Host listener for window scroll event
  @HostListener('window:scroll', ['$event']) onWindowScroll(event) {
    this.onScroll(event)
  }

  page = 0
  limit = 8

  productsSubscription: Subscription
  products: Product[]

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private productStorageService: ProductStorageService
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService.productChanged.subscribe(
      (products: Product[]) => {
        this.products = products
      }
    )

    this.products = this.productService.getAllProducts()
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
  }
  // Get the avatar image for the owner of the product
  getUserImage(username: string) {
    return this.imageService.getProductOwnerImage(username)
  }

  submit(searchForm: NgForm) {
    console.log(searchForm.value.search)
  }

  onScroll(event) {
    // The end of the document reached?
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.page++
      this.productStorageService
        .fetchNextPage(this.page * this.limit, this.limit)
        .subscribe((products: Product[]) => {
          this.productService.addProducts(products)
        })
    }
  }
}
