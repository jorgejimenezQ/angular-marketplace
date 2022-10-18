import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Params, Route, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from './auth.service'
import { IAuthResponse } from './auth-response.interface'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isCreating: boolean
  isLoading: boolean = false
  error: string = null

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.isCreating = params['create'] == 'true'
      console.log(this.isCreating)
    })
  }

  onSwitchAuth() {
    this.isCreating = !this.isCreating
  }

  onSubmit(form: NgForm) {
    let authObservable: Observable<IAuthResponse>
    this.isLoading = true
    if (form.invalid) {
      this.isLoading = false
      return
    }

    let username = form.value.username ? form.value.username : null
    const email = form.value.email
    const password = form.value.password

    if (this.isCreating) {
      authObservable = this.authService.signup(username, email, password)
    } else {
      authObservable = this.authService.login(email, password)
    }

    authObservable.subscribe({
      next: (res) => {
        this.isLoading = false
        this.router.navigate(['/products/list'])
      },
      error: (e) => {
        console.log(e)
        this.error = e.error.error
        console.log(this.error)
        this.isLoading = false
      },
    })
    form.reset()
  }
}
