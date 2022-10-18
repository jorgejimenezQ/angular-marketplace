import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { UserService } from 'src/app/user/user.service'
import { ConversationResponse } from '../model/conversation-response.model'
import { MessageStorageService } from './message-storage.service'
import { MessageService } from './message.service'

@Injectable({ providedIn: 'root' })
export class ConversationResolver implements Resolve<ConversationResponse[]> {
  constructor(
    private msgStorageService: MessageStorageService,
    private msgService: MessageService,
    private userService: UserService
  ) {}

  /**
   * Resolves the conversations from a given product
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ConversationResponse[] | Observable<ConversationResponse[]> | Promise<ConversationResponse[]> {
    if (!this.userService.isUserAuthenticated()) return null
    const itemNumber = route.params['itemNumber']
    return this.msgStorageService.fetchAllProductConv(itemNumber).pipe(
      tap((conversations) => {
        this.msgService.updateConversations(conversations)
        console.log(conversations)
      })
    )
  }
}
