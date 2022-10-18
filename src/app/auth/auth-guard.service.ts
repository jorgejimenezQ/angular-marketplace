import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from '../user/user.service'

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Continue if the user is authenticated
    // or go to the login page
    if (this.userService.isUserAuthenticated()) return true
    return this.router.createUrlTree(['/authenticate'])
  }
}
