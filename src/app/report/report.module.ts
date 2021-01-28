import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { StudentExaminationCardComponent } from './student-examination-card/student-examination-card.component';
import { CourseUnitReportComponent } from './course-unit-report/course-unit-report.component';
import { CourseReportComponent } from './course-report/course-report.component';
import { SmsReportComponent } from './sms-report/sms-report.component';
import { TranscriptComponent } from './transcript/transcript.component';


@NgModule({
  declarations: [AttendanceSheetComponent, StudentExaminationCardComponent, CourseUnitReportComponent, CourseReportComponent, SmsReportComponent, TranscriptComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
