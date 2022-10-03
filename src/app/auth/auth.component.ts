import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Params, Route } from '@angular/router'
import { Observable } from 'rxjs'
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

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

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
    if (form.invalid) return

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
        console.log(res)
      },
      error: (e) => {
        this.isLoading = false
        console.log(e)
      },
    })
    form.reset()
  }
}
