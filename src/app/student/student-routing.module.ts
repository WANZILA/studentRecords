import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminStudentMenuComponent } from './admin-student-menu/admin-student-menu.component';

const routes: Routes = [
  { path: '',
    component: AdminStudentMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
