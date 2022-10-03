import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs'
import { User } from '../user/user.model'
import { IAuthResponse } from './auth-response.interface'

@Injectable({ providedIn: 'root' })
export class AuthService {
  // An observer for the user. Using a BehaviorSubject here so we can access current value
  user = new BehaviorSubject<User>(null)
  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, email: string, password: string) {
    const url = 'https://jorge-marketplace-api.herokuapp.com/users'
    // const url = 'http://localhost:3000/users'
    // Call the rest API to authenticate the user
    return this.http
      .post<IAuthResponse>(url, {
        username,
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.saveUser(new User(res.username, res.email, res.image, res.products, res.token))
        })
      )
  }

  login(email: string, password: string) {
    const url = 'https://jorge-marketplace-api.herokuapp.com/login'
    // const url = 'http://localhost:3000/users'
    // Call the rest API to authenticate the user
    return this.http
      .post<IAuthResponse>(url, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.saveUser(new User(res.username, res.email, res.image, res.products, res.token))
        })
      )
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(() => new Error(errorResponse.message))
  }

  // Save the authenticated user to local storage and cast the user with the subject
  private saveUser(user: User) {
    //cast the authenticated user
    this.user.next(user)
    // save the user to storage
    localStorage.setItem('user', JSON.stringify(user))
  }
}
