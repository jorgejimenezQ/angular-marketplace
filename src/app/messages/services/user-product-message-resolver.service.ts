import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { ConversationResponse } from '../model/conversation-response.model'

@Injectable({ providedIn: 'root' })
export class UserProductMessageResolver implements Resolve<ConversationResponse[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ConversationResponse[] | Observable<ConversationResponse[]> | Promise<ConversationResponse[]> {
    return null
  }
}
