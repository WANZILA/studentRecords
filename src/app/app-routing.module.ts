import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [

  { path: 'login', 
    loadChildren: () => import('./login/login.module').then (m =>
      m.LoginModule)
  },
  {
    path:'adminstudentmenu',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule) 
  },
  {
    path:'adminmenu',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'structure',
    loadChildren: () => import('./structures/structures.module').then( m => m.StructuresModule)
  },
  {
    path: 'registry',
    loadChildren: () => import('./registry/registry.module').then( m=> m.RegistryModule)
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
  imports: [RouterModule.forRoot(routes,
    // supports reloading of app on cpanel
                                 { useHash: true }
                                // ,{ relativeLinkResolution: 'legacy' } 
                                 )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
