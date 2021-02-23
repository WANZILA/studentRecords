import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared/shared.module';

import { StructuresRoutingModule } from './structures-routing.module';
import { IntakeComponent } from './intake/intake.component';
import { SemesterNameComponent } from './semester-name/semester-name.component';
import { SemesterDatesComponent } from './semester-dates/semester-dates.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { CourseUnitComponent } from './course-unit/course-unit.component';
import { GradeComponent } from './grade/grade.component';
import { MarksComponent } from './marks/marks.component';
import { ClassAwardComponent } from './class-award/class-award.component';
import { UpdateIntakeComponent } from './update-intake/update-intake.component';
import { UpdateSemesterNameComponent } from './update-semester-name/update-semester-name.component';
import { UpdateSemesterDateComponent } from './update-semester-date/update-semester-date.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { UpdateCourseUnitComponent } from './update-course-unit/update-course-unit.component';
import { UpdateGradeComponent } from './update-grade/update-grade.component';
import { UpdateMarksComponent } from './update-marks/update-marks.component';
import { UpdateClassAwardComponent } from './update-class-award/update-class-award.component';


@NgModule({
  declarations: [IntakeComponent, SemesterNameComponent, SemesterDatesComponent, DepartmentComponent, CourseComponent, CourseUnitComponent, GradeComponent, MarksComponent, ClassAwardComponent, UpdateIntakeComponent, UpdateSemesterNameComponent, UpdateSemesterDateComponent, UpdateDepartmentComponent, UpdateCourseComponent, UpdateCourseUnitComponent, UpdateGradeComponent, UpdateMarksComponent, UpdateClassAwardComponent],
  imports: [
    CommonModule,
    StructuresRoutingModule,
    SharedModule
  ]
})
export class StructuresModule { }
