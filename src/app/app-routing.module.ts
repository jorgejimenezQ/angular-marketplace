import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const appRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./products/modules/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'authenticate',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
