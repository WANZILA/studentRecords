import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollStudentAddComponent } from './enroll-student-add/enroll-student-add.component';
import { EnrollStudentEditComponent } from './enroll-student-edit/enroll-student-edit.component';
import { EnrollStudentComponent } from './enroll-student/enroll-student.component';
import { EnrolledStudentSearchComponent } from './enrolled-student-search/enrolled-student-search.component';
import { MarkAddComponent } from './mark-add/mark-add.component';
import { MarkEditComponent } from './mark-edit/mark-edit.component';

import { MarkSearchComponent } from './mark-search/mark-search.component';
import { SemesterCourseUnitAllocateComponent } from './semester-course-unit-allocate/semester-course-unit-allocate.component';
import { SemesterCourseUnitSearchComponent } from './semester-course-unit-search/semester-course-unit-search.component';
import { SemesterCourseUnitsComponent } from './semester-course-units/semester-course-units.component';

import { StudentAllComponent } from './student-all/student-all.component';


const routes: Routes = [
  { path: '',
    children: [
      {
        path: 'semestercourseunitSearch',
        component: SemesterCourseUnitSearchComponent
      },
      {
        path: 'semestercourseunitAllocate',
        component: SemesterCourseUnitAllocateComponent
      },
      {
        path: 'semestercourseunitAdd',
        component: SemesterCourseUnitsComponent,
        
      },
      {
        path: 'enrollstudent',
        component: EnrollStudentComponent
      },
      {
        path: 'enrollstudentAdd',
        component: EnrollStudentAddComponent
      },
      {
        path: 'enrollstudentEdit/:markNum',
        component: EnrollStudentEditComponent
      },
      {
        path: 'enrolledstudentSearch',
        component: EnrolledStudentSearchComponent
      },
      // {
      //   path: 'unenrolledstudents',
      //   component: StudentUnEnrolledComponent
      // },
      {
        path: 'markSearch',
        component: MarkSearchComponent
      }, 
      {
        path: 'markAdd',
        component: MarkAddComponent
      }, 
      {
        path: 'markEdit/:markNum',
        component: MarkEditComponent
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
