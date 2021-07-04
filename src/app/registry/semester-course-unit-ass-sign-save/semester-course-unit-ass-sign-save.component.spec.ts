import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCourseUnitAssSignSaveComponent } from './semester-course-unit-ass-sign-save.component';

describe('SemesterCourseUnitAssSignSaveComponent', () => {
  let component: SemesterCourseUnitAssSignSaveComponent;
  let fixture: ComponentFixture<SemesterCourseUnitAssSignSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterCourseUnitAssSignSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCourseUnitAssSignSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
