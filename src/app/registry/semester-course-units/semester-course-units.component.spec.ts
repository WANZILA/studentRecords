import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCourseUnitsComponent } from './semester-course-units.component';

describe('SemesterCourseUnitsComponent', () => {
  let component: SemesterCourseUnitsComponent;
  let fixture: ComponentFixture<SemesterCourseUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterCourseUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCourseUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
