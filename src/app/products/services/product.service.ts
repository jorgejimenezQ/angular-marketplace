import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Condition } from '../../shared/condition.enum'
import { Product } from '../models/product.model'
import data from '../sample-data.json'

@Injectable({ providedIn: 'root' })
export class ProductService {
  public productChanged: Subject<Product[]> = new Subject<Product[]>()
  // A flag to determine if the products are loading or not (used for a loading spinner). This is a subject so that the value can be changed from anywhere in the app. The value is initially true.
  public loadingChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  private products: Product[] = []
  public tempProducts: Product[] = [
    {
      user: {
        username: 'ssummertonh',
        image: 'placeholder.png',
      },
      owner: 'ssummertonh',
      images: ['assets/products/23.jpg'],
      name: 'syrup - kahlua cafe au lait - 750ml - 2 pack',
      condition: Condition['Like New'],
      price: 16.37,
      category: 'Outdoors',
      itemNumber: 'AYd2a60f4d',
      description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      isSold: false,
    },
    {
      user: {
        username: 'rladbrook1',
        image: 'placeholder.png',
      },
      owner: 'rladbrook1',
      images: ['assets/products/10.jpg'],
      name: 'asparagus - white, fresh',
      condition: Condition['Like New'],
      price: 42.88,
      category: 'Outdoors',
      itemNumber: 'UCd2a60f43',
      description:
        'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      isSold: false,
    },
    {
      user: {
        username: 'lphoenix9',
        image: 'placeholder.png',
      },
      owner: 'lphoenix9',
      images: ['assets/products/18.jpg'],
      name: 'beans - fava fresh',
      condition: Condition['Like New'],
      price: 27.34,
      category: 'Outdoors',
      itemNumber: 'OKd2a60f48',
      description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      isSold: false,
    },
    {
      user: {
        username: 'agiorgioe',
        image: 'placeholder.png',
      },
      owner: 'agiorgioe',
      images: ['assets/products/27.jpg'],
      name: 'cumin - whole',
      condition: Condition['Like New'],
      price: 68.76,
      category: 'Shoes',
      itemNumber: 'DUd2a60f3e',
      description: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
      isSold: false,
    },
    {
      user: {
        username: 'tsimionato8',
        image: 'placeholder.png',
      },
      owner: 'tsimionato8',
      images: ['assets/products/3.jpg'],
      name: 'thermometer digital',
      price: 93.22,
      condition: Condition['Like New'],
      category: 'Kids',
      itemNumber: 'MZd2a60f34',
      description:
        'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
      isSold: false,
    },
    {
      user: {
        username: 'choldforthb',
        image: 'placeholder.png',
      },
      owner: 'choldforthb',
      images: ['assets/products/26.jpg'],
      name: 'wine - red, cabernet sauvignon',
      condition: Condition['Like New'],
      price: 74.15,
      category: 'Books',
      itemNumber: 'DKd2a60f39',
      description:
        'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      isSold: false,
    },
    {
      user: {
        username: 'kwelchman3',
        image: 'placeholder.png',
      },
      owner: 'kwelchman3',
      images: ['assets/products/6.jpg'],
      name: 'ecolab - power fusion',
      condition: Condition['Like New'],
      price: 28.63,
      category: 'Grocery',
      itemNumber: 'ADd2a60f2f',
      description: 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
      isSold: false,
    },
    {
      user: {
        username: 'superuser',
        image: 'placeholder.png',
      },
      owner: 'superuser',
      images: ['assets/products/17.jpg'],
      name: 'shoes or something',
      condition: Condition['Like New'],
      price: 56,
      category: 'Video Games',
      itemNumber: 'SWe3b4f494',
      description: 'Some nice shoes or something like that',
      isSold: false,
    },
    {
      user: {
        username: 'jdumberrill6',
        image: 'placeholder.png',
      },
      owner: 'jdumberrill6',
      images: ['assets/products/3.jpg'],
      name: 'shrimp - black tiger 26/30',
      condition: Condition['Like New'],
      price: 17.27,
      category: 'Games',
      itemNumber: 'NXd2a60f75',
      description:
        'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      isSold: false,
    },
    {
      user: {
        username: 'bkildahl4',
        image: 'placeholder.png',
      },
      owner: 'bkildahl4',
      images: ['assets/products/8.jpg'],
      name: 'crackers - trio',
      condition: Condition['Like New'],
      price: 58.92,
      category: 'Sports',
      itemNumber: 'DPd2a60f6b',
      description:
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      isSold: false,
    },
    {
      user: {
        username: 'tsimionato8',
        image: 'placeholder.png',
      },
      owner: 'tsimionato8',
      images: ['assets/products/15.jpg'],
      name: 'lid tray - 12in dome',
      condition: Condition['Like New'],
      price: 92.31,
      category: 'Industrial',
      itemNumber: 'CMd2a60f66',
      description: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
      isSold: false,
    },
    {
      user: {
        username: 'agiorgioe',
        image: 'placeholder.png',
      },
      owner: 'agiorgioe',
      images: ['assets/products/21.jpg'],
      name: 'pepsi - 600ml',
      condition: Condition['Like New'],
      price: 63.62,
      category: 'Toys',
      itemNumber: 'QKd2a60f61',
      description:
        'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
      isSold: false,
    },
    {
      user: {
        username: 'agiorgioe',
        image: 'placeholder.png',
      },
      owner: 'agiorgioe',
      images: ['assets/products/19.jpg'],
      name: 'petite baguette',
      condition: Condition['Like New'],
      price: 96.83,
      category: 'Movies',
      itemNumber: 'CQd2a60f70',
      description:
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      isSold: false,
    },
    {
      user: {
        username: 'lpolhillg',
        image: 'placeholder.png',
      },
      owner: 'lpolhillg',
      images: ['assets/products/25.jpg'],
      name: 'grapes - red',
      condition: Condition['Like New'],
      price: 31.78,
      category: 'Industrial',
      itemNumber: 'QDd2a60f5c',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      isSold: false,
    },
    {
      user: {
        username: 'akoenei',
        image: 'placeholder.png',
      },
      owner: 'akoenei',
      images: ['assets/products/8.jpg'],
      name: 'sobe - lizard fuel',
      condition: Condition['Like New'],
      price: 40.87,
      category: 'Health',
      itemNumber: 'BGd2a60f57',
      description:
        'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
      isSold: false,
    },
    {
      user: {
        username: 'scollinghama',
        image: 'placeholder.png',
      },
      owner: 'scollinghama',
      images: ['assets/products/25.jpg'],
      name: 'chambord royal',
      condition: Condition['Like New'],
      price: 47.22,
      category: 'Automotive',
      itemNumber: 'YYd2a60f52',
      description:
        'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
      isSold: false,
    },
  ]

  constructor() {
    // let i = 0
    // for (let product of data) {
    //   const images: string[] = ['https://source.unsplash.com/random/200x200?sig=' + i]
    //   this.products.push(
    //     new Product(
    //       product.name,
    //       product.description,
    //       +product.price.substring(1),
    //       product.owner,
    //       product.itemNumber,
    //       images,
    //       product.isSold,
    //       Condition[product.condition.replace(/\s/g, '')],
    //       product.category
    //     )
    //   )
    //   i++
    // }
    this.products = this.tempProducts
  }

  /**
   * Returns a copy of the current list of products
   * @returns {Product[]} - An array of products
   */
  public getAllProducts(): Product[] {
    return this.products.slice()
  }

  /**
   * Get a copy of the products up to a limit.
   * @param limit {number} - The last index (exclusive) in the array
   * @returns {Product[]} - An array of products
   */
  public getProductsLimit(limit: number): Product[] {
    if (limit >= this.products.length || !limit) return this.getAllProducts()
    return this.products.slice(undefined, limit)
  }

  /**
   * Updates the current list of products.
   *
   *  @param products {Product[]} - The array of products that will be the new products list
   */
  public updateAllProducts(products: Product[]) {
    this.products = products.slice()
    this.productChanged.next(this.getAllProducts())
  }

  /**
   * Get the product with the given item number.
   * @param itemNumber {string} - The item number of the product
   * @returns {Product} - The product with the given item number or null if not found
   */
  public getProduct(itemNumber: string): Product {
    const product = this.products.find((product) => product.itemNumber === itemNumber)
    if (!product) null
    return product
  }

  /**
   * Add a list of products to the current list of products.
   * @param products {Product[]} - The list of products to add
   */
  public addProducts(products: Product[]) {
    let isChanged: boolean = false
    for (let product of products) {
      if (this.products.find((p) => p.itemNumber === product.itemNumber)) continue
      this.products.push(product)
      isChanged = true
    }
    if (isChanged) {
      this.productChanged.next(this.getAllProducts())
      console.log('updated the list')
    }
  }

  /**
   * Set the loading flag to the given value. This is used to show a loading spinner.
   * @param isLoading {boolean} - The value to set the loading flag to
   */
  public setLoading(isLoading: boolean) {
    this.loadingChanged.next(isLoading)
  }
}
