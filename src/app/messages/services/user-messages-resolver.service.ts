import { state } from '@angular/animations'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { UserService } from 'src/app/user/user.service'
import { ConversationResponse } from '../model/conversation-response.model'
import { Message } from '../model/message.model'
import { MessageStorageService } from './message-storage.service'
import { MessageService } from './message.service'

@Injectable({ providedIn: 'root' })
export class UserMessagesResolverService implements Resolve<ConversationResponse[]> {
  constructor(
    private msgStorageService: MessageStorageService,
    private messageService: MessageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ConversationResponse[] | Observable<ConversationResponse[]> | Promise<ConversationResponse[]> {
    console.log('UserMessagesResolverService called')
    return this.msgStorageService.fetchAllUserConversations().pipe(
      tap((conversations) => {
        this.messageService.updateConversations(conversations)
      })
    )
  }
}
