import { NgModule } from '@angular/core';
import { SharedModule} from './../shared/shared/shared.module';

import { StudentRoutingModule } from './student-routing.module';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentApplicationSearchComponent } from './student-application-search/student-application-search.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { DeleteApplicationComponent } from './delete-application/delete-application.component';
import { FormSampleComponent } from './form-sample/form-sample.component';
import { SampleGenericValidationComponent } from './sample-generic-validation/sample-generic-validation.component';
import { GenericValidation2Component } from './generic-validation2/generic-validation2.component';


@NgModule({
  declarations: [
    StudentApplicationComponent,
    StudentApplicationSearchComponent,
    EditApplicationComponent,
    DeleteApplicationComponent,
    FormSampleComponent,
    SampleGenericValidationComponent,
    GenericValidation2Component,
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
