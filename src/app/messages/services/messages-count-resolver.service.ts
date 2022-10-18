import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { MessageStorageService } from './message-storage.service'
import { MessageService } from './message.service'

@Injectable({ providedIn: 'root' })
export class MessagesCountResolver implements Resolve<{ itemNumber: string; count: number }[]> {
  constructor(
    private messageService: MessageService,
    private messagesStorageService: MessageStorageService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | { itemNumber: string; count: number }[]
    | Observable<{ itemNumber: string; count: number }[]>
    | Promise<{ itemNumber: string; count: number }[]> {
    return this.messagesStorageService.getMessagesCount()
  }
}
