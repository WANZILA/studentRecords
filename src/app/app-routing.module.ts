import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [

  { path: 'login', 
    loadChildren: () => import('./login/login.module').then (m =>
      m.LoginModule)
  },
  { path: 'adminMenu',
    component: AdminMenuComponent
  },

  {
    path:'adminstudentmenu',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule) 
  },
  { 
    path: '', 
    redirectTo:'/login', 
    pathMatch:'full'
  },
  { 
    path : '**', 
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
