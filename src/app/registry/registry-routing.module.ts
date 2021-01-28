import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterMarksComponent } from './enter-marks/enter-marks.component';
import { ImportAttendanceComponent } from './import-attendance/import-attendance.component';
import { MarksEnterComponent } from './marks-enter/marks-enter.component';
import { MarksUpdateComponent } from './marks-update/marks-update.component';
import { SearchSemesterCourseUnitsComponent } from './search-semester-course-units/search-semester-course-units.component';
import { SemesterCourseUnitsComponent } from './semester-course-units/semester-course-units.component';
import { StudentAdmitComponent } from './student-admit/student-admit.component';
import { StudentAdmittedComponent } from './student-admitted/student-admitted.component';
import { StudentAllComponent } from './student-all/student-all.component';
import { StudentApplicationsComponent } from './student-applications/student-applications.component';
import { StudentEnrollComponent } from './student-enroll/student-enroll.component';
import { StudentUnEnrolledComponent } from './student-un-enrolled/student-un-enrolled.component';
import { UpdateSemesterCourseUnitsComponent } from './update-semester-course-units/update-semester-course-units.component';
const routes: Routes = [
  { path: '',
    children: [
      {
        path: '',
        component: StudentApplicationsComponent
      },
      {
        path: 'admitstudent',
        component: StudentAdmitComponent
      },
      {
        path: 'admittedstudents',
        component: StudentAdmittedComponent
      },
      {
        path: 'semestercourseunits',
        component: SemesterCourseUnitsComponent
      },
      {
        path: 'updatesemestercourseunits',
        component: UpdateSemesterCourseUnitsComponent
      },
      {
        path: 'searchsemestercourseunits',
        component: SearchSemesterCourseUnitsComponent
      },
      {
        path: 'enrollstudent',
        component: StudentEnrollComponent
      },
      {
        path: 'enrolledstudents',
        component: StudentEnrollComponent
      },
      {
        path: 'unenrolledstudents',
        component: StudentUnEnrolledComponent
      },
      {
        path: 'entermarks',
        component: MarksEnterComponent
      },
      {
        path: 'editmarks',
        component: MarksUpdateComponent
      },
      {
        path: 'importattendance',
        component: ImportAttendanceComponent
      },
      {
        path: 'studentall',
        component: StudentAllComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
