import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean
  userSubscription: Subscription
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserSubject().subscribe((user) => {
      this.isAuthenticated = user !== null
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  onAuthenticate(create: boolean) {
    if (create) {
      this.router.navigate(['authenticate', 'create'])
      return
    }

    this.router.navigate(['authenticate'])
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (e) => {
        console.log(e)
      },
    })

    this.router.navigate(['/products'])
  }
}
