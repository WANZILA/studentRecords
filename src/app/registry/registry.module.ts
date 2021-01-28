import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryRoutingModule } from './registry-routing.module';
import { SemesterCourseUnitsComponent } from './semester-course-units/semester-course-units.component';
import { ImportAttendanceComponent } from './import-attendance/import-attendance.component';
import { UpdateSemesterCourseUnitsComponent } from './update-semester-course-units/update-semester-course-units.component';
import { SearchSemesterCourseUnitsComponent } from './search-semester-course-units/search-semester-course-units.component';
import { StudentApplicationsComponent } from './student-applications/student-applications.component';
import { StudentAllComponent } from './student-all/student-all.component';
import { StudentEnrollComponent } from './student-enroll/student-enroll.component';
import { StudentUnEnrolledComponent } from './student-un-enrolled/student-un-enrolled.component';
import { StudentAdmitComponent } from './student-admit/student-admit.component';
import { StudentAdmittedComponent } from './student-admitted/student-admitted.component';

@NgModule({
  declarations: [
    SemesterCourseUnitsComponent, 
     ImportAttendanceComponent,
    UpdateSemesterCourseUnitsComponent, 
     SearchSemesterCourseUnitsComponent,
     StudentApplicationsComponent, 
      StudentAllComponent, 
      StudentEnrollComponent,
       StudentUnEnrolledComponent, 
       StudentAdmitComponent,
       StudentAdmittedComponent,
     ],
  imports: [
    CommonModule,
    RegistryRoutingModule
  ]
})
export class RegistryModule { }
