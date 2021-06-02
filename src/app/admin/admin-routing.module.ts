import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';


const routes: Routes = [
  { 
    path: '',
    children:[
      {
        path: 'adminEdit/:adminId',
        component: AdminEditComponent
      },
      {
        path: 'adminSearch',
        component: AdminSearchComponent
      },
      {
        path: 'adminReset',
        component: AdminResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
