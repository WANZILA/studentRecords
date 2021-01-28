import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUnitReportComponent } from './course-unit-report.component';

describe('CourseUnitReportComponent', () => {
  let component: CourseUnitReportComponent;
  let fixture: ComponentFixture<CourseUnitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseUnitReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUnitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
