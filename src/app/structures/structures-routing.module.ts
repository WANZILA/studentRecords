import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassAwardComponent } from './class-award/class-award.component';
import { CourseUnitComponent } from './course-unit/course-unit.component';
import { CourseComponent } from './course/course.component';
import { DepartmentComponent } from './department/department.component';
import { GradeComponent } from './grade/grade.component';
import { IntakeComponent } from './intake/intake.component';
import { MarksComponent } from './marks/marks.component';
import { SemesterDatesComponent } from './semester-dates/semester-dates.component';
import { SemesterNameComponent } from './semester-name/semester-name.component';
import { UpdateClassAwardComponent } from './update-class-award/update-class-award.component';
import { UpdateCourseUnitComponent } from './update-course-unit/update-course-unit.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { UpdateGradeComponent } from './update-grade/update-grade.component';
import { UpdateIntakeComponent } from './update-intake/update-intake.component';
import { UpdateMarksComponent } from './update-marks/update-marks.component';
import { UpdateSemesterDateComponent } from './update-semester-date/update-semester-date.component';
import { UpdateSemesterNameComponent } from './update-semester-name/update-semester-name.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: IntakeComponent
      },
      {
        path: 'updateintake',
        component: UpdateIntakeComponent
      },
      {
        path: 'semestername',
        component: SemesterNameComponent
      },
      {
        path: 'updatesemestername',
        component: UpdateSemesterNameComponent
      },
      {
        path: 'semesterdate',
        component: SemesterDatesComponent
      },
      {
        path: 'updatesemesterdate',
        component: UpdateSemesterDateComponent
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'updatedepartment',
        component: UpdateDepartmentComponent
      },
      {
        path: 'course',
        component: CourseComponent
      },
      {
        path: 'updatecourse',
        component: UpdateCourseComponent
      },
      {
        path: 'courseunit' ,
        component: CourseUnitComponent
      },
      {
        path: 'updatecourseunit' ,
        component: UpdateCourseUnitComponent
      },
      {
        path: 'grade' ,
        component: GradeComponent
      },
      {
        path: 'updategrade' ,
        component: UpdateGradeComponent
      },
      {
        path: 'marks',
        component: MarksComponent
      },
      {
        path: 'updatemarks',
        component: UpdateMarksComponent
      },
      {
        path: 'classaward',
        component: ClassAwardComponent
      },
      {
        path: 'updateclassaward',
        component: UpdateClassAwardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule { }
