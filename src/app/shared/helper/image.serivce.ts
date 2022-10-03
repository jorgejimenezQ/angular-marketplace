import { Injectable } from '@angular/core'
import { UserService } from 'src/app/user/user.service'

@Injectable({ providedIn: 'root' })
export class ImageService {
  constructor() {}
  getUserAvatarImage(username: string) {
    const seed = username
    let image = `https://avatars.dicebear.com/api/avataaars/${seed}.svg`
    return image
  }
}
