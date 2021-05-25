import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteApplicationComponent } from './delete-application/delete-application.component';
import { EditApplicationGuard } from './edit-application.guard';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { StudentApplicationSearchComponent } from './student-application-search/student-application-search.component';

const routes: Routes = [
  { path: '',
    children: [
    {
       path: 'editStudentApplication/:studentId',
      // component: EditApplicationComponent
     // path: ':id/editStudentApplication',
      canDeactivate: [EditApplicationGuard],
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
