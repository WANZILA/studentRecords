import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteApplicationComponent } from './delete-application/delete-application.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { StudentApplicationSearchComponent } from './student-application-search/student-application-search.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
// import { AdminStudentMenuComponent } from './admin-student-menu/admin-student-menu.component';


const routes: Routes = [
  { path: '',
    children: [
     { path: '',
      component: StudentApplicationComponent
     },
    {
      path: 'editStudentApplication',
      component: EditApplicationComponent
    },
    {
      path: 'deleteStudentApplication',
      component:  DeleteApplicationComponent  
    },
    {
      path: 'studentApplicationSearch',
      component: StudentApplicationSearchComponent
    }

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
