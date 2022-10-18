import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Message } from '../model/message.model'
import { MessageStorageService } from './message-storage.service'
import { MessageService } from './message.service'

/**
 * Resolves the messages for a message group using the message group id in the route parameter.
 * The messages are stored in the message storage service.
 */
@Injectable({ providedIn: 'root' })
export class MessageDetailsResolver implements Resolve<Message[]> {
  constructor(
    private msgStorageService: MessageStorageService,
    private msgService: MessageService
  ) {}

  /**
   * This resolver is used to get all the messages for a conversation using the message group id.
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Message[] | Observable<Message[]> | Promise<Message[]> {
    console.log('the route as it is in the message details resolver: ', route)

    // If the parameter is 'create' then the user wants to create a new message. In this case, the resolver will not fetch any messages and we just return an empty array.
    const messageGroupId = route.params['messageGroup']
    if (messageGroupId === 'create') {
      console.log(route.queryParamMap.get('itemNumber'))
      return []
    }

    // Use the messageGroupId to get the messages for the conversation
    return this.msgStorageService.fetchMessagesByMessageGroupId(messageGroupId).pipe(
      tap((messages) => {
        this.msgService.updateMessages(messages)
        console.log(messages)
      })
    )
  }
}
