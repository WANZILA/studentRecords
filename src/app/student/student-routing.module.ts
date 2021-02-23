import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteApplicationComponent } from './delete-application/delete-application.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { FormSampleComponent } from './form-sample/form-sample.component';
import { GenericValidation2Component } from './generic-validation2/generic-validation2.component';
import { SampleGenericValidationComponent } from './sample-generic-validation/sample-generic-validation.component';
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
    },
    {
      path: 'formSample',
      component: FormSampleComponent
    },
    {
      path: 'generic',
      component: SampleGenericValidationComponent
    },
    {
      path: 'generic2',
      component: GenericValidation2Component
    }

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
