import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { StudentApplicationSearchComponent } from './student-application-search/student-application-search.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { DeleteApplicationComponent } from './delete-application/delete-application.component';


@NgModule({
  declarations: [
    StudentApplicationComponent,
    StudentApplicationSearchComponent,
    EditApplicationComponent,
    DeleteApplicationComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
