import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassAwardComponent } from './class-award/class-award.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseUnitSearchComponent } from './course-unit-search/course-unit-search.component';
import { CourseUnitComponent } from './course-unit/course-unit.component';
import { CourseComponent } from './course/course.component';
import { DepartmentSearchComponent } from './department-search/department-search.component';
import { DepartmentComponent } from './department/department.component';
import { GradeSearchComponent } from './grade-search/grade-search.component';
import { GradeComponent } from './grade/grade.component';
import { IntakeSearchComponent } from './intake-search/intake-search.component';
import { IntakeComponent } from './intake/intake.component';
import { SemesterDateSearchComponent } from './semester-date-search/semester-date-search.component';
import { SemesterDatesComponent } from './semester-dates/semester-dates.component';
import { SemesterNameSearchComponent } from './semester-name-search/semester-name-search.component';
import { SemesterNameComponent } from './semester-name/semester-name.component';
// import { SemesterDateSearchComponent } from './update-semester-date/update-semester-date.component';
// import { SemesterDateSearchComponent } from './semester-date-search/semester-date-search.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'intakeSearch',
        component: IntakeSearchComponent
      },
      {
        path: 'intakeEdit/:intakeDate',
        component: IntakeComponent
      },
      {
        path: 'semesternameSearch',
        component: SemesterNameSearchComponent 
      },
      {
        path: 'semesternameEdit/:semesterNum',
        component:SemesterNameComponent 
      },
      {
        path: 'semesterdateSearch',
        component: SemesterDateSearchComponent
      },
      {
        path: 'semesterdateEdit/:semesterDateCode',
        component: SemesterDatesComponent
      },
      {
        path: 'departmentSearch',
        component: DepartmentSearchComponent
      },
      {
        path: 'departmentEdit/:departCode',
        component: DepartmentComponent
      },
      {
        path: 'courseSearch',
        component: CourseSearchComponent
      },
      {
        path: 'courseEdit/:courseCode',
        component: CourseComponent
      },
      {
        path: 'courseunitSearch' ,
        component: CourseUnitSearchComponent
      },
      {
        path: 'courseunitEdit/:courseUnitCode' ,
        component: CourseUnitComponent
      },
      {
        path: 'gradeSearch' ,
        component: GradeSearchComponent
      },
      {
        path: 'gradeEdit/:gradeCode' ,
        component: GradeComponent
      },
     
      {
        path: 'classaward',
        component: ClassAwardComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule { }
