import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { Message } from '../model/message.model'
import { MessageStorageService } from './message-storage.service'
import { MessageService } from './message.service'

@Injectable({ providedIn: 'root' })
export class ItemMessagesResolver implements Resolve<Message[]> {
  constructor(
    private msgService: MessageService,
    private msgStorageService: MessageStorageService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Message[] | Observable<Message[]> | Promise<Message[]> {
    const itemNumber = route.params['itemNumber']

    return this.msgStorageService.fetchAllProductMessages(itemNumber).pipe(
      tap((messages) => {
        this.msgService.updateMessages(messages)
        console.log(messages)
      })
    )
  }
}
