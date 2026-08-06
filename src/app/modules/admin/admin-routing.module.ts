import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'products',
        component: ProductListComponent
      },

      {
        path: 'add',
        component: AddProductComponent
      },

      {
        path: 'edit/:id',
        component: EditProductComponent
      },

      {
       path: 'admin/edit/:id',
       component: EditProductComponent
      },

      {
        path: 'orders',
        component: OrderListComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
