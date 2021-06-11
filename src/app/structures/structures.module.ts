import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StructuresRoutingModule } from './structures-routing.module';
import { IntakeComponent } from './intake/intake.component';
import { SemesterNameComponent } from './semester-name/semester-name.component';
import { SemesterDatesComponent } from './semester-dates/semester-dates.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { CourseUnitComponent } from './course-unit/course-unit.component';
import { GradeComponent } from './grade/grade.component';

import { ClassAwardComponent } from './class-award/class-award.component';

import { IntakeSearchComponent } from './intake-search/intake-search.component';
import { SemesterDateSearchComponent } from './semester-date-search/semester-date-search.component';
import { SemesterNameSearchComponent } from './semester-name-search/semester-name-search.component';
import { DepartmentSearchComponent } from './department-search/department-search.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseUnitSearchComponent } from './course-unit-search/course-unit-search.component';
import { GradeSearchComponent } from './grade-search/grade-search.component';


@NgModule({
  declarations: [IntakeComponent, SemesterNameComponent, SemesterDatesComponent, DepartmentComponent, CourseComponent, CourseUnitComponent, GradeComponent, ClassAwardComponent, IntakeSearchComponent, SemesterDateSearchComponent, SemesterNameSearchComponent, DepartmentSearchComponent, CourseSearchComponent, CourseUnitSearchComponent, GradeSearchComponent, ],
  imports: [
    CommonModule,
    StructuresRoutingModule,
    SharedModule
  ]
})
export class StructuresModule { }
