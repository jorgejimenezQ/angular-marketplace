import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class MessageStorageService {
  constructor(private http: HttpClient) {}

  //TODO: write implementation
  fetchMessages() {
    throw new Error('Not implemented')
  }
}
