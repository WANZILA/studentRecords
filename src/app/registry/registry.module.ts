import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryRoutingModule } from './registry-routing.module';
import { StudentAllComponent } from './student-all/student-all.component';
import { StudentEnrollComponent } from './student-enroll/student-enroll.component';
import { StudentUnEnrolledComponent } from './student-un-enrolled/student-un-enrolled.component';
import { MarkSearchComponent } from './mark-search/mark-search.component';
import { SharedModule } from '../shared/shared.module';
import { SemesterCourseUnitsComponent } from './semester-course-units/semester-course-units.component';
import { SemesterCourseUnitSearchComponent } from './semester-course-unit-search/semester-course-unit-search.component';
import { SemesterCourseUnitAllocateComponent } from './semester-course-unit-allocate/semester-course-unit-allocate.component';
import { SampleWorkComponent } from './sample-work/sample-work.component';
import { SemesterCourseUnitAssSignSaveComponent } from './semester-course-unit-ass-sign-save/semester-course-unit-ass-sign-save.component';
import { EnrolledStudentSearchComponent } from './enrolled-student-search/enrolled-student-search.component';
import { EnrollStudentComponent } from './enroll-student/enroll-student.component';
import { EnrollStudentEditComponent } from './enroll-student-edit/enroll-student-edit.component';
import { EnrollStudentAddComponent } from './enroll-student-add/enroll-student-add.component';
import { MarkEnterComponent } from './mark-enter/mark-enter.component';
import { MarkAddComponent } from './mark-add/mark-add.component';
import { MarkEditComponent } from './mark-edit/mark-edit.component';

@NgModule({
  declarations: [    
      StudentAllComponent,
      SemesterCourseUnitsComponent, 
      StudentEnrollComponent,
       StudentUnEnrolledComponent, 
       MarkSearchComponent, 
       SemesterCourseUnitSearchComponent, SemesterCourseUnitAllocateComponent, SampleWorkComponent, SemesterCourseUnitAssSignSaveComponent, EnrolledStudentSearchComponent, 
       EnrollStudentComponent, EnrollStudentEditComponent, 
        EnrollStudentAddComponent, MarkEnterComponent, MarkAddComponent, MarkEditComponent
     ],
  imports: [
    CommonModule,
    RegistryRoutingModule,
    SharedModule
  ]
})
export class RegistryModule { }
