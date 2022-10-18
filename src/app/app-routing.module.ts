import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const appRoutes: Routes = [
  { path: '', redirectTo: 'products/list', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./products/modules/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'authenticate',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/modules/user.module').then((m) => m.UserModule),
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/modules/messages.module').then((m) => m.MessageModule),
  },
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false, scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
