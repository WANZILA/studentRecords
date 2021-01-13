import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';

const routes: Routes = [
  { path: '', 
    component: LoginComponent 
  },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'studentLogin', component: StudentLoginComponent},
  {
    path: 'adminMenu',
    loadChildren: () => import('../menu/menu.module').then (m =>
      m.MenuModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
