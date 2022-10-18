import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs'
import { User } from '../user/user.model'
import { IAuthResponse } from './auth-response.interface'
import { UserService } from '../user/user.service'
import { ImageService } from '../shared/helper/image.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  error: Subject<string> = new Subject<string>()

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private imageService: ImageService
  ) {}

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
        tap((res) => {
          console.log(res)
          this.userService.setUser(
            new User(
              res['user'].username,
              res['user'].email,
              this.imageService.getUserAvatarImage(res['user'].username),
              res['user'].products,
              res.token
            )
          )
        })
      )
  }

  login(email: string, password: string) {
    const url = 'https://jorge-marketplace-api.herokuapp.com/users/login'
    // const url = 'http://localhost:3000/users'

    // console.log(email, password)
    // Call the rest API to authenticate the user
    return this.http
      .post<IAuthResponse>(url, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          console.log(res)
          this.userService.setUser(
            new User(
              res['user'].username,
              res['user'].email,
              this.imageService.getUserAvatarImage(res['user'].username),
              res['user'].products,
              res.token
            )
          )
        })
      )
  }

  // Checks for a user stored on the local storage
  authOnRefresh() {
    // Get the user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'))
    if (!userData || !userData._token) return

    // console.log('there was user : ', userData)
    // If there was any data set the user
    this.userService.setUser(
      new User(
        userData.username,
        userData.email,
        userData.image,
        userData.products,
        userData._token
      )
    )
  }

  logout() {
    // If we are not authenticated there is a problem
    // maybe in the future we can log error here
    if (this.userService.getUser() === null) return

    const url = 'https://jorge-marketplace-api.herokuapp.com/users/logOutAll'

    const bearer = `Bearer ${this.userService.getUser().token}`

    // Create the request and return an observable
    return this.http
      .post(url, null, { headers: new HttpHeaders({ Authorization: bearer }) })
      .pipe(catchError(this.handleError))
  }
  /*************************************** */
  /**        H E L P E R S                 */
  /*************************************** */
  private handleError(errorResponse: HttpErrorResponse) {
    // this.error.next(errorResponse.error.error)
    return throwError(() => new Error(errorResponse.error.error))
  }
}
