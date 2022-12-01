import { Injectable } from '@angular/core'
import { UserService } from 'src/app/user/user.service'

@Injectable({ providedIn: 'root' })
export class ImageService {
  savedUsers: {} = {}

  userHasImage = [
    'https://api.lorem.space/image/face?w=150&h=150&hash=8B7BCDC2',
    'https://api.lorem.space/image/face?w=150&h=150&hash=500B67FB',
    'https://api.lorem.space/image/face?w=150&h=150&hash=A89D0DE6',
    'https://api.lorem.space/image/face?w=150&h=150&hash=225E6693',
    'https://api.lorem.space/image/face?w=150&h=150&hash=9D9539E7',
    'https://api.lorem.space/image/face?w=150&h=150&hash=BDC01094',
    'https://api.lorem.space/image/face?w=150&h=150&hash=7F5AE56A',
    'https://api.lorem.space/image/face?w=150&h=150&hash=4F32C4CF',
    'https://api.lorem.space/image/face?w=150&h=150&hash=B0E33EF4',
    'https://api.lorem.space/image/face?w=150&h=150&hash=2D297A22',
  ]

  productImages = [
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=8B7BCDC2',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=500B67FB',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=A89D0DE6',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=225E6693',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=9D9539E7',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=BDC01094',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=7F5AE56A',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=4F32C4CF',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=B0E33EF4',
    'https://api.lorem.space/image/shoes?w=150&h=150&hash=2D297A22',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=8B7BCDC2',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=500B67FB',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=A89D0DE6',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=225E6693',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=9D9539E7',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=BDC01094',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=7F5AE56A',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=4F32C4CF',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=B0E33EF4',
    'https://api.lorem.space/image/watch?w=150&h=150&hash=2D297A22',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=8B7BCDC2',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=500B67FB',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=A89D0DE6',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=225E6693',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=9D9539E7',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=BDC01094',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=7F5AE56A',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=4F32C4CF',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=B0E33EF4',
    'https://api.lorem.space/image/furniture?w=150&h=150&hash=2D297A22',
    'https://api.lorem.space/image?w=150&h=180&hash=8B7BCDC2',
    'https://api.lorem.space/image?w=150&h=180&hash=500B67FB',
    'https://api.lorem.space/image?w=150&h=180&hash=A89D0DE6',
    'https://api.lorem.space/image?w=150&h=180&hash=225E6693',
    'https://api.lorem.space/image?w=150&h=180&hash=9D9539E7',
    'https://api.lorem.space/image?w=150&h=180&hash=BDC01094',
    'https://api.lorem.space/image?w=150&h=180&hash=7F5AE56A',
    'https://api.lorem.space/image?w=150&h=180&hash=4F32C4CF',
    'https://api.lorem.space/image?w=150&h=180&hash=B0E33EF4',
    'https://api.lorem.space/image?w=150&h=180&hash=2D297A22',
  ]
  constructor() {}
  getUserAvatarImage(username: string) {
    const seed = username
    let image = `https://avatars.dicebear.com/api/avataaars/${seed}.svg`
    return image
  }

  //TODO: generate an image for a user
  getProductOwnerImage(username: string) {
    if (!this.savedUsers[username]) {
      // this.savedthis.savedUserss.push(username)
      // return this.getthis.savedUsersAvatarImage(username)
      // this.savedUsers[username] =
      // this.userHasImage[Math.floor(Math.random() * this.userHasImage.length)]

      let image = `https://avatars.dicebear.com/api/avataaars/${username}.svg`
      this.savedUsers[username] = image

      return this.savedUsers[username]
    }

    return this.savedUsers[username]
  }

  getProductImage() {
    const seed = Math.ceil(Math.random() * 28)
    const image = 'assets/products/' + seed + '.jpg'
    return image
  }

  getProductImageSeed(seed: string) {
    const image = 'assets/products/' + seed + '.jpg'
    return image
  }
}
