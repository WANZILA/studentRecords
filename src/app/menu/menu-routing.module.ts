import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: '',
  //   component: AdminMenuComponent
  // },
  // {
  //   path:'studentInfo',
  //   loadChildren: () => import('../student/student.module').then(m => m.StudentModule) 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
