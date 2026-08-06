import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './modules/home/home/home.component';
import { AdminGuard } from './core/guards/admin.guard';
import { ProductListComponent } from './modules/product/product-list/product-list.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },

  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
  },

  {
    path: 'wishlist',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/wishlist/wishlist.module').then(m => m.WishlistModule)
  },

  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule)
  },

  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
