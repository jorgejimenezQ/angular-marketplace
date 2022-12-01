import { Component, HostListener, OnInit } from '@angular/core'
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router'
import { AuthService } from './auth/auth.service'
import { ProductService } from './products/services/product.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false
  @HostListener('window:onbeforeunload', ['$event'])
  title = 'marketplace'

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.authService.authOnRefresh()
    // this.router.navigate(['/products/list'])

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true
          this.productService.setLoading(true)
          break
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false
          this.productService.setLoading(false)
          break
        }
        default: {
          break
        }
      }
    })
  }

  clearLocalStorage(event) {
    localStorage.clear()
  }
}
