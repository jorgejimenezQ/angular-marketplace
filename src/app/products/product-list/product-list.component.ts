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

  loading: boolean = true

  // The pagination page and limit for the product list
  page = 0
  limit = 8

  // A cached list of products
  productsCache: Product[] = []

  productsSubscription: Subscription
  products: Product[]
  subscriptionList: Subscription[] = []

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

    this.subscriptionList.push(
      this.productService.loadingChanged.subscribe((loading: boolean) => {
        this.loading = loading
        console.log('Loading changed: ', this.loading)
      })
    )

    console.log('Loading initially: ', this.loading)
    // Fetch the second page of products
    this.page++
    this.productStorageService
      .fetchNextPage(this.page * this.limit, this.limit)
      .subscribe((products: Product[]) => {
        this.productsCache = products
        console.log('Products cache: ', this.productsCache)
      })

    this.products = this.productService.getAllProducts()
    // this.products = this.productService.tempProducts as Product[]
    console.log(this.products)
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe()
    // Unsubscribe from all subscriptions in the subscription list array if there are any
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach((subscription) => {
        subscription.unsubscribe()
      })
    }
  }
  // Get the avatar image for the owner of the product
  getUserImage(username: string) {
    return this.imageService.getProductOwnerImage(username)
  }

  submit(searchForm: NgForm) {
    console.log(searchForm.value.search)
  }

  onScroll(event) {
    // Round the scroll position to the nearest 100
    const scrollPosition = Math.round(window.innerHeight + window.scrollY)

    // The end of the document reached?
    if (scrollPosition >= document.body.offsetHeight - 100) {
      // Update the products with the cached products
      this.productService.addProducts(this.productsCache)

      // Fetch the next page of products and cache them
      this.page++
      this.productStorageService
        .fetchNextPage(this.page * this.limit, this.limit)
        .subscribe((products: Product[]) => {
          // this.productService.addProducts(products)
          this.productsCache = products
        })
    }
  }
}
