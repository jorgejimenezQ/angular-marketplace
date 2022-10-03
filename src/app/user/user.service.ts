import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from './user.model'

@Injectable({ providedIn: 'root' })
export class UserService {
  // An observer for the user. Using a BehaviorSubject here so we can access current value
  user = new BehaviorSubject<User>(null)

  getUserSubject() {
    return this.user
  }
  getUser() {
    return this.user.getValue()
  }

  isUserAuthenticated() {
    return this.user.getValue() !== null
  }

  removeUser() {
    this.user.next(null)
    localStorage.removeItem('user')
  }

  // Save the authenticated user to local storage and cast the user with the subject
  setUser(user: User) {
    //cast the authenticated user
    this.user.next(user)
    // save the user to storage
    localStorage.setItem('user', JSON.stringify(user))
  }
}