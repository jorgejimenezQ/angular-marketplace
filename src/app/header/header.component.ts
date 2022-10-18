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
  // The user's image
  userImage: string = null
  // Flag that checks for authenticated user
  isAuthenticated: boolean
  // A Subscription we can user to unsubscribe
  userSubscription: Subscription
  username: string

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to the user
    this.userSubscription = this.userService.getUserSubject().subscribe((user) => {
      this.isAuthenticated = user !== null
      // If we are authenticated update image
      if (this.isAuthenticated) {
        this.username = user.username
        this.userImage = user.image
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  //
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
        // Remove from the subject before sending request
        this.userService.removeUser()
        this.router.navigate(['/products/list'])
      },
      error: (e) => {
        console.log(e)
      },
    })
  }

  onSell() {
    if (this.userService.isUserAuthenticated()) this.router.navigate(['products/sell'])
    else this.router.navigate(['authenticate'])
  }
}
